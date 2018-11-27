var NATS = require('nats');
var nats = NATS.connect();
nats.publish('foo', 'hello world');