"use-strict";

module.exports = function (RED) {
    function NatsStreamingSubscribeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.status({
            fill: "red",
            shape: "ring",
            text: "disconnected"
        });
        this.server = RED.nodes.getNode(config.server);

        let stan = require('node-nats-streaming')
            .connect(this.server.cluster, config.clientID, {
                url: 'nats://' + this.server.server + ':' + this.server.port
            });

        stan.on('error', function (err) {
            node.log(err);
            node.error('Could not connect to server', err);
        });
        
        let subscription
        stan.on('connect', function () {
            node.status({
                fill: "green",
                shape: "dot",
                text: "connected"
            });

            // Subscriber can specify how many existing messages to get.
            let opts = stan.subscriptionOptions();

            // set the starting point in the stream, default is last received
            switch (config.start) {
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
                    try {
                        timeParts = config.start_option.split('-');
                        startTime = new Date(timeParts[0], timeParts[1] - 1, timeParts[2], 0, 0, 0, 0);
                    } catch (err) {
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
            if (config.durable) {
                node.log("set durable name");
                opts.setDurableName(config.durable_name);
            }

            // if queue group is true sets it
            if (config.queue_group) {
                subscription = stan.subscribe(config.channel, config.queue_group_name, opts);
            } else {
                subscription = stan.subscribe(config.channel, opts);
            }

            subscription.on('message', function (msg) {
                let msgToSend;
                msgToSend = {
                    payload: msg.getData(),
                    sequence: msg.getSequence()
                };
                node.send(msgToSend)
            });
        });

        // on node close the nats stream subscription is and connection is also closed
        node.on('close', function (done) {
            node.status({
                fill: "red",
                shape: "ring",
                text: "disconnected"
            });
            subscription.unsubscribe();
            subscription.on('unsubscribed', function () {
                stan.close();
                done();
            });
        });
    }

    RED.nodes.registerType("nats-streaming-subscribe", NatsStreamingSubscribeNode);
}