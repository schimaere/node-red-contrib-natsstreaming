"use-strict";
var stan = require('node-nats-streaming').connect('test-cluster', 'test-publish', {url:"nats://10.0.2.15:4223"});

module.exports = function(RED) {
    function NatsStreamingPublishNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            // Simple Publisher (all publishes are async in the node version of the client)
            stan.publish('foo', 'Hello node-nats-streaming from Node-RED!', function(err, guid){
                if(err) {
                console.log('publish failed: ' + err);
                } else {
                console.log('published message with guid: ' + guid);
                }
            });
        });
    }
    RED.nodes.registerType("nats-streaming-publish",NatsStreamingPublishNode);
}