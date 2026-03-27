import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'destinations',
    docs: 'List of [Destination Objects](https://github.com/asyncapi/bindings/tree/master/solace#destination-object).',
  },
  {
    target: 'timeToLive',
    docs: '`integer` | [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in milliseconds or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the lifetime of the message.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'timeToLive',
    docs: '`integer` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in milliseconds or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the lifetime of the message.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'priority',
    docs: '`integer` | [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nThe valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the priority.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'priority',
    docs: '`integer` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nThe valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the priority.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'dmqEligible',
    docs: '`boolean`\n\\\n\\\nSet the message to be eligible to be moved to a Dead Message Queue. The default value is false.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.4.0" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/tree/master/solace#operation-binding-object)\n\nWe need the ability to support several bindings for each operation, see the [Example](https://github.com/asyncapi/bindings/tree/master/solace#example) section below for details.\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The version of this binding. If omitted, "0.4.0" MUST be assumed.\n`destinations`|List of [Destination Objects](https://github.com/asyncapi/bindings/tree/master/solace#destination-object)|Destination Objects are described next.\n`timeToLive`|Integer \\| [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)|Interval in milliseconds or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the lifetime of the message.\n`priority`|Integer \\| [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) \\| [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)|The valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the priority.\n`dmqEligible`|Boolean|Set the message to be eligible to be moved to a Dead Message Queue. The default value is false.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/tree/master/solace#operation-binding-object)\n\nWe need the ability to support several bindings for each operation, see the [Example](https://github.com/asyncapi/bindings/tree/master/solace#example) section below for details.\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The version of this binding. If omitted, "0.4.0" MUST be assumed.\n`destinations`|List of [Destination Objects](https://github.com/asyncapi/bindings/tree/master/solace#destination-object)|Destination Objects are described next.\n`timeToLive`|Integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)|Interval in milliseconds or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the lifetime of the message.\n`priority`|Integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)|The valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the priority.\n`dmqEligible`|Boolean|Set the message to be eligible to be moved to a Dead Message Queue. The default value is false.',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
