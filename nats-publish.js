var NATS = require('nats');

module.exports = function(RED) {
    function NatsPublishNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var servers = ['nats://' + config.server + ':' + config.port];
            var nats = NATS.connect({'servers': servers});
            nats.publish('foo', config.message);
            nats.publish(msg.payload);
        });
    }
    RED.nodes.registerType("nats-publish",NatsPublishNode);
}