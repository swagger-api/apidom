import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
        'Map[`string`, [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Schema Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject).',
    },
    targetSpecs: AsyncAPI2,
  },
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
        'Map[`string`, [Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable Schema Object. If this is a Schema Object, then the schemaFormat will be assumed to be "application/vnd.aai.asyncapi+json;version=asyncapi" where the version is equal to the AsyncAPI Version String.',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ],
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
        'Map[`string`, [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        'Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Variable Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Channel Item Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelItemObject)]\n\\\n\\\nAn object to hold reusable [Channel Item Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelItemObject).',
    },
    targetSpecs: [
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
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
        'Map[`string`, [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#parameterObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Parameter Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Parameter Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Correlation ID Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Trait Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Server Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverBindingsObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelBindingsObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Channel Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationBindingsObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Operation Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationBindingsObject).',
    },
    targetSpecs: AsyncAPI3,
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
        'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject).',
    },
    targetSpecs: AsyncAPI2,
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
        'Map[`string`, [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Message Bindings Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject).',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
