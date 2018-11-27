#!/usr/bin/env node

"use-strict";

var stan = require('node-nats-streaming').connect('test-cluster', 'test', {url:"nats://10.0.2.15:4223"});

stan.on('connect', function () {

  // Simple Publisher (all publishes are async in the node version of the client)
  stan.publish('foo', 'Hello node-nats-streaming!', function(err, guid){
    if(err) {
      console.log('publish failed: ' + err);
    } else {
      console.log('published message with guid: ' + guid);
    }
  });

  // Subscriber can specify how many existing messages to get.
  var opts = stan.subscriptionOptions().setStartWithLastReceived();
  var subscription = stan.subscribe('foo', opts);
  subscription.on('message', function (msg) {
    console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData());
  });

  // After one second, unsubscribe, when that is done, close the connection
  setTimeout(function() {
    subscription.unsubscribe();
    subscription.on('unsubscribed', function() {
      stan.close();
    });
  }, 1000);
});

stan.on('close', function() {
  process.exit();
});