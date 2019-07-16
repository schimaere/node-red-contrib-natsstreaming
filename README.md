# node-red-contrib-natsstreaming
Node-RED nodes for nats streaming

### Installation

```
npm install node-red-contrib-natsstreaming
```

Or in NodeRED Manage palette and serarch for `node-red-contrib-natsstreaming`

### Requirements

Needs an instance of nats streaming to publish messages or subscribe to a topic
https://nats.io/

### Usage

![publish new](/docs/publish_new.png)

Every publish node needs
* a nats server
* a channel name
* a client id

If everything is correct the node shows a green dot otherwise an error messege will show what is missing and the dot is red.

![publish connected](/docs/publish_connected.png)