"use-strict";

module.exports = function(RED) {
    function NatsStreamingSubscribeNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        let stan = require('node-nats-streaming')
            .connect(this.server.cluster, config.clientID, { url:'nats://' + this.server.server + ':' + this.server.port });

        var subscription
        stan.on('connect', function () {
            // Subscriber can specify how many existing messages to get.
            var opts = stan.subscriptionOptions().setStartWithLastReceived();        
            subscription = stan.subscribe(config.channel, opts);
            subscription.on('message', function (msg) {
                let msgToSend;
                msgToSend = { payload: ('Received a message [' + msg.getSequence() + '] ' + msg.getData()) };
                node.send(msgToSend)
            });
        });

        // on node close the nats stream subscription is and connection is also closed
        node.on('close', function() {
            subscription.unsubscribe();
            subscription.on('unsubscribed', function() {
                stan.close();
            });
        });
    }

    RED.nodes.registerType("nats-streaming-subscribe",NatsStreamingSubscribeNode);
}