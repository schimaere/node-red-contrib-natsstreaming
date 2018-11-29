"use-strict";

module.exports = function(RED) {
    function NatsStreamingSubscribeNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        let stan = require('node-nats-streaming')
            .connect(this.server.cluster, config.clientID, { url:'nats://' + this.server.server + ':' + this.server.port });

        let subscription
        stan.on('connect', function () {
            // Subscriber can specify how many existing messages to get.
            let opts = stan.subscriptionOptions();

            // set the starting point in the stream, default is last received
            switch(config.start) {
                case 'last_received':
                    opts.setStartWithLastReceived();
                    break;
                case 'all':
                    opts.setDeliverAllAvailable();
                    break;
                case 'at_sequence':
                    opts.setStartAtSequence(config.start_option);
                    break;
                case 'at_date':
                    let timeParts;
                    let startTime
                    try{
                        timeParts = config.start_option.split('-');
                        startTime = new Date(timeParts[0], timeParts[1] -1, timeParts[2], 0,0,0,0);
                    }
                    catch(err) {
                        node.error('wrong format in start option. Must be YYYY-MM-DD', msg);                        
                    }                    
                    opts.setStartTime(startTime)
                    break;
                case 'at_time':
                    opts.setStartAtTimeDelta(config.start_option);
                    break;
                default:
                    opts.setStartWithLastReceived();
                    break;
            }

            // if durable is true sets it
            if(config.durable) {
                opts.setDurableName(config.durable_name);
            }

            // if queue group is true sets it
            if(config.queue_group) {
                node.log("set queue gruoup with name: " + config.queue_group_name);
                subscription = stan.subscribe(config.channel, config.queue_group_name, opts);
            } else {
                node.log("set without queue group")
                subscription = stan.subscribe(config.channel, opts);
            }
            
            subscription.on('message', function (msg) {
                let msgToSend;
                node.log('recieved message, node: ' + config.clientID);
                msgToSend = { payload: msg.getData(), sequence: msg.getSequence()};
                node.send(msgToSend)
            });
        });

        // on node close the nats stream subscription is and connection is also closed
        node.on('close', function(done) {
            subscription.unsubscribe();
            subscription.on('unsubscribed', function() {
                stan.close();
                done();
            });
        });
    }

    RED.nodes.registerType("nats-streaming-subscribe",NatsStreamingSubscribeNode);
}