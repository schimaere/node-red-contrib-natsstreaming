"use-strict";

const stan = require('node-nats-streaming')

module.exports = function (RED) {
    function NatsStreamingSubscribeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        setStatusRed();
        this.server = RED.nodes.getNode(config.server);
        let natsInstance = null
        let nodeIsClosing = false
        let subscription = null
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
    
                let opts = instance.subscriptionOptions();
    
                // set the starting point in the stream, default is last received
                switch (config.start) {
                    case 'last_received':
                        opts.setStartWithLastReceived();
                        break;
                    case 'all':
                        opts.setDeliverAllAvailable();
                        break;
                    case 'at_sequence':
                        if (!isNaN(+config.start_option)) {
                            opts.setStartAtSequence(config.start_option);
                        } else {
                            setStatusRed();
                            node.error("Start option has to be a number", config.start_option);
                        }
                        break;
                    case 'at_date':
                        if (checkDate(config.start_option)) {
                            let timeParts;
                            let startTime
                            timeParts = config.start_option.split('-');
                            startTime = new Date(timeParts[0], timeParts[1] - 1, timeParts[2], 0, 0, 0, 0);
                            opts.setStartTime(startTime);
                        } else {
                            setStatusRed();
                            node.error("Wrong format in start option. Has to be YYYY-MM-DD", config.start_option);
                        }
                        break;
                    case 'at_time':
                        if (!isNaN(config.start_option)) {
                            opts.setStartAtTimeDelta(config.start_option);
                        } else {
                            setStatusRed();
                            node.error('Start option has to be a number', config.start_option);
                        }
                        break;
                    default:
                        opts.setStartWithLastReceived();
                        break;
                }
    
                // if durable is true sets it with durable_name
                if (config.durable) {
                    opts.setDurableName(config.durable_name);
                }
    
                // if autoacknowledge is false set await time
                if(config.autoacknowledge == false) {                
                    if(!isNaN(config.ackwait)) {
                        opts.setManualAckMode(true);
                        opts.setAckWait(config.ackwait * 1000);
                    }
                    else{
                        setStatusRed();
                        node.error('Acknowledge wait has to be a number', config.ackwait);
                    }                
                }
    
                // if rate limit is true set max in flight 
                if(config.rate_limit == true) {
                    if(!isNaN(config.max_in_flight)) {
                        opts.setMaxInFlight(config.max_in_flight);
                    }
                    else{
                        setStatusRed();
                        node.error(' Max unacknowledged messages has to be a number', config.ackwait);
                    }   
                }
    
                
    
                // if queue group is true sets it with queue_group_name
                if (config.queue_group) {
                    subscription = instance.subscribe(config.channel, config.queue_group_name, opts);
                } else {
                    subscription = instance.subscribe(config.channel, opts);
                }
    
                // on nats-streaming message
                subscription.on('ready', () => {
                  node.log('subscription is ready')
                  subscription.on('message', msg => handleMessage(msg));
                })
                
                
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

        // on node close the nats stream subscription is and connection is also closed
        node.on('close', function (done) {
            setStatusRed();
            if (reconnectTimer !== null){
              clearTimeout(reconnectTimer);
            }
            nodeIsClosing = true
            // if the subscription is durable do not unsubscribe
            if(config.durable) {
                natsInstance.close();
                done();
            } else {
                subscription.unsubscribe();
                subscription.on('unsubscribed', function () {
                    natsInstance.close();
                    done();
                });
            }                        
        });

        function handleMessage(msg)
        {
            let boundAck = msg.ack.bind(msg);
            let msgToSend;
                msgToSend = {
                    payload: msg.getData(),
                    sequence: msg.getSequence(),
                    autoacknowledge: config.autoacknowledge,
                    streaming_msg: msg,
                    ack: boundAck
                };
                node.send(msgToSend)
        }

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


        // checks if the string could be parsed to a date
        function checkDate(dateString) {
            let timeParts = dateString.split('-');

            // timeParts has to have 3 parts
            if (!(Object.keys(timeParts).length > 2)) {
                return false;
            }

            // the first part is the year and has to be 4 digits
            if (!(/^\d\d\d\d$/.test(timeParts[0]))) {
                return false;
            }

            // secound part is the month and has to be a number and between 1 and 12
            if (!(!isNaN(timeParts[1]) && +timeParts[1] >= 1 && +timeParts[1] <= 12)) {
                return false;
            }

            // third part is the day and has to be a number and between 1 and 31
            if (!(!isNaN(timeParts[2] && +timeParts[2] >= 1 && +timeParts[2] <= 31))) {
                return false;
            }

            return true;
        }
    }

    RED.nodes.registerType("nats-streaming-subscribe", NatsStreamingSubscribeNode);
}