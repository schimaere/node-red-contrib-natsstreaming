"use-strict";

const checkMSG = require('./checkMSG');

module.exports = function (RED) {
    function NatsStreamingPublishNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        node.status({
            fill: "red",
            shape: "ring",
            text: "disconnected"
        });
        this.server = RED.nodes.getNode(config.server);

        // connect to nats streaming server
        let stan = require('node-nats-streaming')
            .connect(this.server.cluster, config.clientID, {
                url: 'nats://' + this.server.server + ':' + this.server.port
            });
        
        // sets status to connected
        stan.on('connect', function() {
            node.status({
                fill: "green",
                shape: "dot",
                text: "connected"
            });
        })        

        stan.on('error', function (err) {
            node.log(err);
            node.error('Could not connect to server', err);
        });



        // on input send message
        node.on('input', function (msg) {
            let message;
            let channel;

            //checks if msg has configurations and sets them
            if (checkMSG(msg.payload)) {
                if(typeof msg.payload != 'string') {
                    try{
                        message = JSON.stringify(msg.payload);
                    } catch(err) {
                        node.error(err, msg.payload);
                    }
                } else {
                    message = msg.payload;
                }                
            } else {
                message = config.message;
            }

            if (checkMSG(msg.channel)) {
                channel = msg.channel;
            } else {
                channel = config.channel;
            }
            
            stan.publish(channel, message, function (err, guid) {
                if (err) {
                    node.log('publish failed: ' + err);
                    node.err('problem while publishing message', msg)
                } else {
                    node.log('published message with guid: ' + guid);
                }
            });
        });

        // on node close the nats stream connection is also closed
        node.on('close', function () {
            node.status({
                fill: "red",
                shape: "ring",
                text: "disconnected"
            });
            stan.close();
        });

    }
    RED.nodes.registerType("nats-streaming-publish", NatsStreamingPublishNode);
}