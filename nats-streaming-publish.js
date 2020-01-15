"use-strict";

const checkMSG = require('./checkMSG');
const stan = require('node-nats-streaming')

module.exports = function (RED) {
    function NatsStreamingPublishNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        setStatusRed()
        this.server = RED.nodes.getNode(config.server);
        let natsInstance = null
        let nodeIsClosing = false
        let reconnectTimer = null
        const connectNats = () => {
            const instance = stan.connect(this.server.cluster, config.clientID, {
                url: 'nats://' + this.server.server + ':' + this.server.port
            });
            
            instance.on('error', function (err) {
                node.log(err);
                node.error('Could not connect to server', err);
            });
    
            instance.on('connect', function () {
                node.log("connected")
                setStatusGreen();                
            });
    
            instance.on('disconnect', () => {
                node.log("disconnect")
                setStatusRed();
            })
    
            instance.on('reconnect', () => {
                node.log("reconnect")
                setStatusGreen();
            })
    
            instance.on('connection_lost', (err) => node.log('connection_lost ' + err));

            return instance
        }


        (function reconnectHandler(){
            natsInstance = connectNats()
            natsInstance.on('close', () => {
                setStatusRed();
                if (reconnectTimer === null && nodeIsClosing === false){
                  node.log("close received. Explicit reconnect attempt in 60 seconds.")
                  reconnectTimer = setTimeout(() => {
                      reconnectHandler();
                      reconnectTimer = null;
                  }, 1000 * 60);
                } else {
                  node.log("Node in flow is shutting down, not attempting to reconenct.")
                }
                
                natsInstance = null
            })
        })();


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
            
            natsInstance.publish(channel, message, function (err, guid) {
                if (err) {
                    node.log('publish failed: ' + err);
                } else {
                    if(config.log == true)
                    {
                        node.log('published message with guid: ' + guid);
                    }
                }
            });
        });

        // on node close the nats stream connection is also closed
        node.on('close', function () {
            if (reconnectTimer !== null){
                clearTimeout(reconnectTimer);
              }
            nodeIsClosing = true
            node.status({
                fill: "red",
                shape: "ring",
                text: "disconnected"
            });
            natsInstance.close();

        });

        function setStatusGreen() {
            node.status({
                fill: "green",
                shape: "dot",
                text: "connected"
            });
        }

        function setStatusRed() {
            node.status({
                fill: "red",
                shape: "ring",
                text: "disconnected"
            });
        }        

    }
    RED.nodes.registerType("nats-streaming-publish", NatsStreamingPublishNode);
}