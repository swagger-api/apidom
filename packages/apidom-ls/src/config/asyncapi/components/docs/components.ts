const componentsDocs = [
  {
    target: 'schemas',
    docs: 'Map[`string`, [Schema Object](https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject).',
  },
  {
    target: 'servers',
    docs: 'Map[`string`, [Server Object](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject).',
  },
  {
    target: 'channels',
    docs: 'Map[`string`, [Server Object](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject).',
  },
  {
    target: 'messages',
    docs: 'Map[`string`, [Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject).',
  },
  {
    target: 'securitySchemes',
    docs: 'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/specifications/v2.3.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Object](https://www.asyncapi.com/docs/specifications/v2.3.0#securitySchemeObject).',
  },
  {
    target: 'parameters',
    docs: 'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/specifications/v2.3.0#parameterObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#parameterObject).',
  },
  {
    target: 'correlationIds',
    docs: 'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/specifications/v2.3.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#correlationIdObject).',
  },
  {
    target: 'operationTraits',
    docs: 'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject).',
  },
  {
    target: 'messageTraits',
    docs: 'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#messageTraitObject).',
  },
  {
    target: 'serverBindings',
    docs: 'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverBindingsObject).',
  },
  {
    target: 'channelBindings',
    docs: 'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#channelBindingsObject).',
  },
  {
    target: 'operationBindings',
    docs: 'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject).',
  },
  {
    target: 'messageBindings',
    docs: 'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#messageBindingsObject).',
  },
  {
    docs: '[Components Object](https://www.asyncapi.com/docs/specifications/v2.3.0#componentsObject)\n\\\n\\\nHolds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
  },
];
export default componentsDocs;
