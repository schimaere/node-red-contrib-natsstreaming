"use-strict";
var stan = require('node-nats-streaming').connect('test-cluster', 'test-subscribe', {url:"nats://10.0.2.15:4223"});

module.exports = function(RED) {
    function NatsStreamingSubscribeNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        // Subscriber can specify how many existing messages to get.
        var opts = stan.subscriptionOptions().setStartWithLastReceived();
        var subscription = stan.subscribe('foo', opts);
        subscription.on('message', function (msg) {
            let msgToSend;
            msgToSend = { payload: ('Received a message [' + msg.getSequence() + '] ' + msg.getData()) };
            node.send(msgToSend)
        });
    }
    RED.nodes.registerType("nats-streaming-subscribe",NatsStreamingSubscribeNode);
}