import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'headers',
    docs: '[Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\n**Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'headers',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\n**Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.0.1" MUST be assumed.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/jms/README.md#message)\n\nThis object contains information about the message representation in JMS.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | **Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.\nbindingVersion | string | The version of this binding. If omitted, "0.0.1" MUST be assumed.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/jms/README.md#message)\n\nThis object contains information about the message representation in JMS.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | **Optional**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type object and have a properties key. Examples of JMS protocol headers are JMSMessageID, JMSTimestamp, and JMSCorrelationID.\nbindingVersion | string | The version of this binding. If omitted, "0.0.1" MUST be assumed.',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
