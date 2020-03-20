# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.3.2 (2020-03-20)


### Features

*  acknowledge nats-messages later ([1880eb5](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/1880eb52358651f8d18b72a174d152cd059feb78))
* added a license ([10516ae](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/10516aef7ecbd29c83d5b2c46dcd57f95cd27920))
* added channel select to streaming-publish ([248e8d6](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/248e8d69de5b21e40b1f2518fa1688f47bd0266d))
* added checkbox for logging in publish node ([e3c9a4a](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/e3c9a4a17bf640486a048d080d4089f2c552c3dd))
* added cluster to streaming-server and use it in streaming-publish ([7107211](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/710721135f5b410f073cfa7a09ead0220d176d76))
* added durable subscription checkbox ([5d1cbcf](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/5d1cbcfebc7f5ccc852f5de8d43927b2f6f1e864))
* added error handling and status to connection ([1f430df](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/1f430df6dd4e721eae4ef5ee38f4a215714c4f50))
* added nats icon and first help ([487eda4](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/487eda4d89caee73dc3eebb719c8245b4423ff63))
* added nats streaming publish node ([20e3e05](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/20e3e0536aae99cfa0ba9dfe5c4e0d62ed291e73))
* added nats-streaming package ([e2a6282](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/e2a62826da8f5508e672c6dd389af8f81bd2ce06))
* added queue_group to subscription ([8dc2aa5](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/8dc2aa5620f868c353c0729dcbbb40458e41a081))
* added streaming subscribe node ([ecc3348](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/ecc33485d2f92c0f5b95dc54c8369eb3e09c7f8f))
* better check if a date is correct ([6c70363](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/6c703634765f62f605b059c223a567053473c45d))
* changed node color ([05d61ec](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/05d61ecb6b943bdd71007c12c5f8062f0235a356))
* first use of configuration node for streaming server ([a97ae7b](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/a97ae7b27884bed15e08faadd2d2380992c20a08))
* first working nats-streaming test ([ea74306](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/ea743060c210dd9e062adad8c50288440cb649d6))
* handle nats disconnect and reconnect events ([9009329](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/90093296834590d78337b8bd015aadaeed930722))
* improved the node help ([69374ac](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/69374ac7793f73b03fd9d3e51cf37512768ab246))
* initial commit ([2f507da](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/2f507da13157241f1138554b0836a4fd7b518e3d))
* payloads for publish can now be JSON objects ([918d522](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/918d522be872f191c885dd1b915a458a9254312b))
* publish sets payload and channel if given from message ([fdeb875](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/fdeb8758947ea9d9370a19f48158af3bcc9c06c8))
* set channel in stream-publish config ([f80caec](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/f80caece7717b0bee70fc82f0155f702a5e19616))
* set github repo ([2f9a2f4](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/2f9a2f4a29da7c45918e8c490f6087158dccfbb6))
* set max in flight messages at subscribe node ([28c2083](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/28c20831c7e8da1e561ba0d213e5558d4ca286b0))
* streaming-subscribe added starting optoins to node ([71f1b70](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/71f1b70bb5cae84ba804f6a28215fe719390f54f))
* streaming-subscribe is working ([0e508a1](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/0e508a170dac4c7b3e8eb7728565d4ef27c039aa))
* updated de node help for streaming-publish ([6a17fbe](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/6a17fbe249db7d5f37b712a842609c75b1b7309f))


### Bug Fixes

* added /node_modules to .gitignore ([79bdeb3](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/79bdeb3ee53aae7da979e3c6962ec4fa54c1e66a))
* added node_modules to .gitignore ([b863ef8](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/b863ef8c77e1a2580ae25f2fa7d01aff60bc184b))
* calling done() when closing durable subscription ([1c4be65](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/1c4be650e235d2f189936ae54cefc5266a366b0f))
* changed import path to checkMSG.js ([b158144](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/b158144ba16fbd20a2db6d5f7a16d1542c868e8d))
* corrected path to files ([8843b67](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/8843b678a5b528c8f7a08a4ccec9de2375346281))
* deleted debug loging ([9dd9eac](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/9dd9eac5e368128d583a97b55f43ae3bcd4df995))
* deleted first test files ([5a24c68](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/5a24c680d569dddd8b2005f186a4a4d3ecf4fd2e))
* deleted node_modules from repository ([8e96ac2](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/8e96ac220bda86c034a571f40b214da97047313a))
* deleted unused nats ([6df199f](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/6df199f33152d1b57d5234f0ffa7530e78f372a4))
* durable subscription now working ([4e810ae](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/4e810aeb235d7248cac4ca233883b9cf754104bd))
* fixed crash on streaming-subscribe re-publish ([b1e18a5](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/b1e18a50077998953e6be7fab94d20cff887250e))
* reconnect logic respects flow restarting on deploy changes ([974b2b8](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/974b2b8b46b4ca277f781fb887f973fff88bfee2))
* set the right config property ([97c53ba](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/97c53ba0a02f8aca689d2fc6291fac724a787fbb))
* TypeError: node.err is not a function ([e67f246](https://github.com/schimaere/node-red-contrib-natsstreaming/commit/e67f246521624350e212ab90c10083e17f67057e))
