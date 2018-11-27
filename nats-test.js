var NATS = require('nats');

module.exports = function(RED) {
    function NatsTestNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var servers = ['nats://10.0.2.15:4222'];
 
            // Randomly connect to a server in the cluster group.
            var nats = NATS.connect({'servers': servers});
            nats.publish('foo', 'hello world');
            msg.payload = "send do NATS";
            node.send(msg);
        });
    }
    RED.nodes.registerType("nats-test",NatsTestNode);
}