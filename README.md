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

#### Publish
![publish new](/docs/publish_new.png)

Every publish node needs
* a nats server
* a channel name
* a client id

If everything is correct the node shows a green dot otherwise an error messege will show what is missing and the dot is red.

![publish connected](/docs/publish_connected.png)

#### Subscribe
![subscribe new](/docs/subscribe_new.png)

The subscribe node needs the same basic settings
* a nats server
* a channel name
* a client id

This node will also show a green dot if it is connected and a red one if not.

![publish connected](/docs/subscribe_connected.png)

#### Server
![publish connected](/docs/server_add.png)
The configuration for a nats streaming server is saved in an NodeRED configuration node.
Adding a new one can be done from a publish or subscribe node by clicking selecting `Add new nat-straming-server...` and clicking on the pen icon.

![server new](/docs/server_new.png)

The server needs 
* a nats server adress - default is localhost
* a port number - default is 4233
* a name of the cluster - default is test-cluster