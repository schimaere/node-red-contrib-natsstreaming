module.exports = function(RED) {
    function NatsStreamingServerNode(n) {
        RED.nodes.createNode(this,n);
        this.server = n.server;
        this.port = n.port;
    }
    RED.nodes.registerType("nats-streaming-server",NatsStreamingServerNode);
}