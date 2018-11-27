var NATS = require('nats');
var nats = NATS.connect();
nats.subscribe('foo', function(msg) {
    console.log('Received a message: ' + msg);
})