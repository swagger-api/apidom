import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'schemas',
    insertText: 'schemas',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject).',
    },
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    label: 'serverVariables',
    insertText: 'serverVariables',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverVariableObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    label: 'channels',
    insertText: 'channels',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
    ],
  },
  {
    label: 'messages',
    insertText: 'messages',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageObject).',
    },
  },
  {
    label: 'securitySchemes',
    insertText: 'securitySchemes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#securitySchemeObject).',
    },
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#parameterObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#parameterObject).',
    },
  },
  {
    label: 'correlationIds',
    insertText: 'correlationIds',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#correlationIdObject).',
    },
  },
  {
    label: 'operationTraits',
    insertText: 'operationTraits',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationTraitObject).',
    },
  },
  {
    label: 'messageTraits',
    insertText: 'messageTraits',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageTraitObject).',
    },
  },
  {
    label: 'serverBindings',
    insertText: 'serverBindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverBindingsObject).',
    },
  },
  {
    label: 'channelBindings',
    insertText: 'channelBindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#channelBindingsObject).',
    },
  },
  {
    label: 'operationBindings',
    insertText: 'operationBindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#operationBindingsObject).',
    },
  },
  {
    label: 'messageBindings',
    insertText: 'messageBindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.5.0#messageBindingsObject).',
    },
  },
];

export default completion;
