const documentation = [
  {
    target: 'groupId',
    docs: 'Defines a logical group of IBM MQ server objects. This is necessary to specify multi-endpoint configurations used in high availability deployments. If omitted, the server object is not part of a group.',
  },
  {
    target: 'ccdtQueueManagerName',
    docs: 'The name of the IBM MQ queue manager to bind to in the CCDT file.',
  },
  {
    target: 'cipherSpec',
    docs: 'The recommended cipher specification used to establish a TLS connection between the client and the IBM MQ queue manager. More information on SSL/TLS cipher specifications supported by IBM MQ can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.dev.doc/q113220_.html) in the IBM MQ Knowledge Center.',
  },
  {
    target: 'multiEndpointServer',
    docs: '`boolean`\n\\\n\\\nIf `multiEndpointServer` is `true` then multiple connections can be workload balanced and applications should not make assumptions as to where messages are processed. Where message ordering, or affinity to specific message resources is necessary, a single endpoint (`multiEndpointServer` = `false`) may be required.',
  },
  {
    target: 'heartBeatInterval',
    docs: '`integer`\n\\\n\\\nThe recommended value (in seconds) for the heartbeat sent to the queue manager during periods of inactivity. A value of zero means that no heart beats are sent. A value of `1` means that the client will use the value defined by the queue manager. More information on heart beat interval can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q108450_.html) in the IBM MQ Knowledge Center.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding.',
  },
  {
    docs: "#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/ibmmq/README.md#server-binding-object)\n\nThis object contains server connection information about the IBM MQ server, referred to as an IBM MQ queue manager. This object contains additional connectivity information not possible to represent within the core AsyncAPI specification.\n\n##### Fixed Fields\n\n\nField Name | Type | Description | Applicability \\[default\\] | Constraints\n---|:---:|---|:---|:---\n`groupId` | string | Defines a logical group of IBM MQ server objects. This is necessary to specify multi-endpoint configurations used in high availability deployments. If omitted, the server object is not part of a group. | OPTIONAL | MUST NOT be specified for URI Scheme `http://` or `file://`\n`ccdtQueueManagerName` | string | The name of the IBM MQ queue manager to bind to in the CCDT file. | OPTIONAL [`*`] | MUST NOT be specified for URI Scheme `ibmmq://`\n`cipherSpec` | string | The recommended cipher specification used to establish a TLS connection between the client and the IBM MQ queue manager. More information on SSL/TLS cipher specifications supported by IBM MQ can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.dev.doc/q113220_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`ANY`] | MUST NOT be specified for protocol `ibmmq` or URI Scheme `file://` or `http://`\n`multiEndpointServer` | boolean | If `multiEndpointServer` is `true` then multiple connections can be workload balanced and applications should not make assumptions as to where messages are processed. Where message ordering, or affinity to specific message resources is necessary, a single endpoint (`multiEndpointServer` = `false`) may be required. | OPTIONAL [`false`] | MUST NOT be specified for URI Scheme `file://` or `http://`\n`heartBeatInterval` | integer | The recommended value (in seconds) for the heartbeat sent to the queue manager during periods of inactivity. A value of zero means that no heart beats are sent. A value of `1` means that the client will use the value defined by the queue manager. More information on heart beat interval can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q108450_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`300`] | MUST be `0-999999`\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`0.1.0`] | -\n\nThis object MUST contain only the properties defined above.\n\n##### Example for multiple endpoints defined in the AsyncAPI configuration\n\n\n\\\nYAML\n```yaml\nservers:\n  production1:\n    url: ibmmq://qmgr1host:1414/qm1/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Production Instance 1\n    bindings:\n      ibmmq:\n        groupId: PRODCLSTR1\n        cipherSpec: ANY_TLS12_OR_HIGHER\n        bindingVersion: 0.1.0\n  production2:\n    url: ibmmq://qmgr2host:1414/qm2/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Production Instance 2\n    bindings:\n      ibmmq:\n        groupId: PRODCLSTR1\n        bindingVersion: 0.1.0\n```\n\n##### Example using combined strategy\n\n```yaml\nservers:\n  production:\n    url: 'http://my-ccdt-json-file'\n    protocol: ibmmq-secure\n    description: Production MQ Instance\n    bindings:\n      ibmmq:\n        ccdtQueueManagerName: qm1\n  test:\n    url: ibmmq://qmgrtest:1414/qm2/DEV.APP.SVRCONN\n    protocol: ibmmq-secure\n    description: Test MQ Instance\n    bindings:\n      ibmmq:\n        cipherSpec: ANY_TLS12_OR_HIGHER\n        bindingVersion: 0.1.0\n```",
  },
];
export default documentation;
