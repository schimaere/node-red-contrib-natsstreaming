"use-strict";

module.exports = function(RED) {
    function NatsStreamingPublishNode(config) {
        RED.nodes.createNode(this,config);
        let node = this;
        this.server = RED.nodes.getNode(config.server);

        // connect to nats streaming server
        let stan = require('node-nats-streaming')
            .connect(this.server.cluster, 'test-publish', { url:'nats://' + this.server.server + ':' + this.server.port });

        // on input send message
        node.on('input', function(msg) {
            stan.publish(config.channel, config.message, function(err, guid){
                if(err) {
                console.log('publish failed: ' + err);
                } else {
                console.log('published message with guid: ' + guid);
                }
            });
        });

        // on node close the nats stream connection is also closed
        node.on('close', function() {
            stan.close();
        });

    }
    RED.nodes.registerType("nats-streaming-publish",NatsStreamingPublishNode);
}