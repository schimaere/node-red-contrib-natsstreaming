"use-strict";

module.exports = function (RED) {
    function NatsStreamingAcknowledgeNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;

        // on input acknowled message
        node.on('input', function (msg) {
            if(msg.autoacknowledge == false)
            {
                node.log("Acknowledging message")
                msg.ack();          
            }            
        });

    }
    RED.nodes.registerType("nats-streaming-acknowledge", NatsStreamingAcknowledgeNode);
}