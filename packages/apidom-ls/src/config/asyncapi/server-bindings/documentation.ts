const documentation = [
  {
    target: '$ref',
    docs: 'A reference to a Server Bindings',
  },
  {
    target: 'http',
    docs: '[HTTP Server Binding](https://github.com/asyncapi/bindings/blob/master/http#server)\n\\\n\\\nProtocol-specific information for an HTTP server.',
  },
  {
    target: 'ws',
    docs: '[WebSockets Server Binding](https://github.com/asyncapi/bindings/blob/master/websockets#server)\n\\\n\\\nProtocol-specific information for a WebSockets server.',
  },
  {
    target: 'kafka',
    docs: '[Kafka Server Binding](https://github.com/asyncapi/bindings/blob/master/kafka#server)\n\\\n\\\nProtocol-specific information for a Kafka server.',
  },
  {
    target: 'anypointmq',
    docs: '[Anypoint MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#server)\n\\\n\\\nProtocol-specific information for an Anypoint MQ server.',
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    target: 'amqp',
    docs: '[AMQP Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp#server)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 server.',
  },
  {
    target: 'amqp1',
    docs: '[AMQP 1.0 Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#server)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 server.',
  },
  {
    target: 'mqtt',
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/tree/master/mqtt#server-binding-object)\n\nThis object contains information about the server representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`clientId` | string | The client identifier.\n`cleanSession` | boolean | Whether to create a persisten connection or not. When `false`, the connection will be persistent.\n`lastWill` | object | Last Will and Testament configuration.\n`lastWill.topic` | string | The topic where the Last Will and Testament message will be sent.\n`lastWill.qos` | integer | Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.\n`lastWill.message` | string | Last Will message.\n`lastWill.retain` | boolean | Whether the broker should retain the Last Will and Testament message or not.\n`keepAlive` | integer | Interval in seconds of the longest period of time the broker and the client can endure without sending a message.\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
  },
  {
    target: 'mqtt5',
    docs: '[MQTT 5 Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#server)\n\\\n\\\nProtocol-specific information for an MQTT 5 server.',
  },
  {
    target: 'nats',
    docs: '[NATS Server Binding](https://github.com/asyncapi/bindings/blob/master/nats#server)\n\\\n\\\nProtocol-specific information for a NATS server.',
  },
  {
    target: 'jms',
    docs: '[JMS Server Binding](https://github.com/asyncapi/bindings/blob/master/jms#server)\n\\\n\\\nProtocol-specific information for a JMS server.',
  },
  {
    target: 'sns',
    docs: '[SNS Server Binding](https://github.com/asyncapi/bindings/blob/master/sns#server)\n\\\n\\\nProtocol-specific information for an SNS server.',
  },
  {
    target: 'solace',
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/tree/master/solace#server-binding-object)\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The current version is 0.2.0\n`msgVpn`|String|The Virtual Private Network name on the Solace broker.',
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    target: 'sqs',
    docs: '[SQS Server Binding](https://github.com/asyncapi/bindings/blob/master/sqs#server)\n\\\n\\\nProtocol-specific information for an SQS server.',
  },
  {
    target: 'stomp',
    docs: '[STOMP Server Binding](https://github.com/asyncapi/bindings/blob/master/stomp#server)\n\\\n\\\nProtocol-specific information for a STOMP server.',
  },
  {
    target: 'redis',
    docs: '[Redis Server Binding](https://github.com/asyncapi/bindings/blob/master/redis#server)\n\\\n\\\nProtocol-specific information for a Redis server.',
  },
  {
    target: 'mercure',
    docs: '[Mercure Server Binding](https://github.com/asyncapi/bindings/blob/master/mercure#server)\n\\\n\\\nProtocol-specific information for a Mercure server.',
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    target: 'ibmmq',
    docs: "#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/ibmmq/README.md#server-binding-object)\n\nThis object contains server connection information about the IBM MQ server, referred to as an IBM MQ queue manager. This object contains additional connectivity information not possible to represent within the core AsyncAPI specification.\n\n##### Fixed Fields\n\n\nField Name | Type | Description | Applicability \\[default\\] | Constraints\n---|:---:|---|:---|:---\n`groupId` | string | Defines a logical group of IBM MQ server objects. This is necessary to specify multi-endpoint configurations used in high availability deployments. If omitted, the server object is not part of a group. | OPTIONAL | MUST NOT be specified for URI Scheme `http://` or `file://`\n`ccdtQueueManagerName` | string | The name of the IBM MQ queue manager to bind to in the CCDT file. | OPTIONAL [`*`] | MUST NOT be specified for URI Scheme `ibmmq://`\n`cipherSpec` | string | The recommended cipher specification used to establish a TLS connection between the client and the IBM MQ queue manager. More information on SSL/TLS cipher specifications supported by IBM MQ can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.dev.doc/q113220_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`ANY`] | MUST NOT be specified for protocol `ibmmq` or URI Scheme `file://` or `http://`\n`multiEndpointServer` | boolean | If `multiEndpointServer` is `true` then multiple connections can be workload balanced and applications should not make assumptions as to where messages are processed. Where message ordering, or affinity to specific message resources is necessary, a single endpoint (`multiEndpointServer` = `false`) may be required. | OPTIONAL [`false`] | MUST NOT be specified for URI Scheme `file://` or `http://`\n`heartBeatInterval` | integer | The recommended value (in seconds) for the heartbeat sent to the queue manager during periods of inactivity. A value of zero means that no heart beats are sent. A value of `1` means that the client will use the value defined by the queue manager. More information on heart beat interval can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q108450_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`300`] | MUST be `0-999999`\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -\n\nThis object MUST contain only the properties defined above.\n\n##### Example for multiple endpoints defined in the AsyncAPI configuration\n\n\n\\\nYAML\n```yaml\nservers:\n  production1:\n    url: ibmmq://qmgr1host:1414/qm1/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Production Instance 1\n    bindings:\n      ibmmq:\n        groupId: PRODCLSTR1\n        cipherSpec: ANY_TLS12_OR_HIGHER\n        bindingVersion: 0.1.0\n  production2:\n    url: ibmmq://qmgr2host:1414/qm2/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Production Instance 2\n    bindings:\n      ibmmq:\n        groupId: PRODCLSTR1\n        bindingVersion: 0.1.0\n```\n\n##### Example using combined strategy\n\n```yaml\nservers:\n  production:\n    url: 'http://my-ccdt-json-file'\n    protocol: ibmmq-secure\n    description: Production MQ Instance \n    bindings:\n      ibmmq:\n        ccdtQueueManagerName: qm1\n  test:\n    url: ibmmq://qmgrtest:1414/qm2/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Test MQ Instance\n    bindings:\n      ibmmq:\n        cipherSpec: ANY_TLS12_OR_HIGHER\n        bindingVersion: 0.1.0\n```",
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    target: 'googlepubsub',
    docs: '[Google Cloud Pub/Sub Server Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub#server)\n\\\n\\\nProtocol-specific information for a Google Cloud Pub/Sub server.',
    targetSpecs: [{ namespace: 'asyncapi', version: '2.5.0' }],
  },
  {
    docs: '#### [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverBindingsObject)\n\nMap describing protocol-specific definitions for a server.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`http` | [HTTP Server Binding](https://github.com/asyncapi/bindings/blob/master/http#server) | Protocol-specific information for an HTTP server.\n`ws` | [WebSockets Server Binding](https://github.com/asyncapi/bindings/blob/master/websockets#server) | Protocol-specific information for a WebSockets server.\n`kafka` | [Kafka Server Binding](https://github.com/asyncapi/bindings/blob/master/kafka#server) | Protocol-specific information for a Kafka server.\n`anypointmq` | [Anypoint MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/anypointmq#server) | Protocol-specific information for an Anypoint MQ server.\n`amqp` | [AMQP Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp#server) | Protocol-specific information for an AMQP 0-9-1 server.\n`amqp1` | [AMQP 1.0 Server Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#server) | Protocol-specific information for an AMQP 1.0 server.\n`mqtt` | [MQTT Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#server) | Protocol-specific information for an MQTT server.\n`mqtt5` | [MQTT 5 Server Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#server) | Protocol-specific information for an MQTT 5 server.\n`nats` | [NATS Server Binding](https://github.com/asyncapi/bindings/blob/master/nats#server) | Protocol-specific information for a NATS server.\n`jms` | [JMS Server Binding](https://github.com/asyncapi/bindings/blob/master/jms#server) | Protocol-specific information for a JMS server.\n`sns` | [SNS Server Binding](https://github.com/asyncapi/bindings/blob/master/sns#server) | Protocol-specific information for an SNS server.\n`solace` | [Solace Server Binding](https://github.com/asyncapi/bindings/blob/master/solace#server) | Protocol-specific information for a Solace server.\n`sqs` | [SQS Server Binding](https://github.com/asyncapi/bindings/blob/master/sqs#server) | Protocol-specific information for an SQS server.\n`stomp` | [STOMP Server Binding](https://github.com/asyncapi/bindings/blob/master/stomp#server) | Protocol-specific information for a STOMP server.\n`redis` | [Redis Server Binding](https://github.com/asyncapi/bindings/blob/master/redis#server) | Protocol-specific information for a Redis server.\n`mercure` | [Mercure Server Binding](https://github.com/asyncapi/bindings/blob/master/mercure#server) | Protocol-specific information for a Mercure server.\n`ibmmq` | [IBM MQ Server Binding](https://github.com/asyncapi/bindings/blob/master/ibmmq#server-binding-object) | Protocol-specific information for an IBM MQ server.\n`googlepubsub` | [Google Cloud Pub/Sub Server Binding](https://github.com/asyncapi/bindings/blob/master/googlepubsub#server) | Protocol-specific information for a Google Cloud Pub/Sub server.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).',
  },
];
export default documentation;
