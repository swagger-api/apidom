const documentation = [
  {
    target: 'jmsConnectionFactory',
    docs: '`string`\n\\\n\\\n**Required**. The classname of the [ConnectionFactory](https://docs.oracle.com/javaee/7/api/javax/jms/ConnectionFactory.html) implementation for the JMS Provider.',
  },
  {
    target: 'properties',
    docs: '[object]\n\\\n\\\n**Optional**. Additional properties to set on the JMS ConnectionFactory implementation for the JMS Provider.',
  },
  {
    target: 'clientID',
    docs: "`string`\n\\\n\\\n**Optional**. A client identifier for applications that use this JMS connection factory. If the Client ID Policy is set to 'Restricted' (the default), then configuring a Client ID on the ConnectionFactory prevents more than one JMS client from using a connection from this factory.",
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.0.1" MUST be assumed.',
  },
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/jms/README.md#server-binding-object)\n\nField Name | Type | Description\n---|:---:|---\n`jmsConnectionFactory` | string | **Required**. The classname of the [ConnectionFactory](https://docs.oracle.com/javaee/7/api/javax/jms/ConnectionFactory.html) implementation for the JMS Provider.\n`properties` | [object] | **Optional**. Additional properties to set on the JMS ConnectionFactory implementation for the JMS Provider.\n`clientID` | string | **Optional**. A client identifier for applications that use this JMS connection factory.\n`bindingVersion` | string | The version of this binding. If omitted, "0.0.1" MUST be assumed.',
  },
];
export default documentation;
