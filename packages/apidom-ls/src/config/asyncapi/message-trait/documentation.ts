/**
 * Omitted fixed fields:
 *  - tags
 *  - externalDocs
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    target: 'messageId',
    docs: 'Unique string used to identify the message. The id MUST be unique among all messages described in the API. The messageId value is **case-sensitive**. Tools and libraries MAY use the messageId to uniquely identify a message, therefore, it is RECOMMENDED to follow common programming naming conventions.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'headers',
    docs: '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) \\\n\\\nSchema definition of the application headers. Schema MUST be of type "object". It **MUST NOT** define the protocol headers.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'headers',
    docs: '[Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) &#124; [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nSchema definition of the application headers. Schema MUST be a map of key-value pairs. It **MUST NOT** define the protocol headers. If this is a Schema Object, then the schemaFormat will be assumed to be "application/vnd.aai.asyncapi+json;version=asyncapi" where the version is equal to the AsyncAPI Version String.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'correlationId',
    docs: '[Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nDefinition of the correlation ID used for message tracing or matching.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'correlationId',
    docs: '[Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nDefinition of the correlation ID used for message tracing or matching.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'schemaFormat',
    docs: 'A string containing the name of the schema format/language used to define the message payload. If omitted, implementations should parse the payload as a [Schema object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject).',
    targetSpces: AsyncAPI2,
  },
  {
    target: 'contentType',
    docs: "The content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). When omitted, the value MUST be the one specified on the [defaultContentType](https://www.asyncapi.com/docs/reference/specification/v2.6.0#defaultContentTypeString) field.",
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'contentType',
    docs: "The content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). When omitted, the value MUST be the one specified on the [defaultContentType](https://www.asyncapi.com/docs/reference/specification/v3.0.0#defaultContentTypeString) field.",
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'name',
    docs: 'A machine-friendly name for the message.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'title',
    docs: 'A human-friendly title for the message.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'summary',
    docs: 'A short summary of what the message is about.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'description',
    docs: 'A verbose explanation of the message. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
  },
  {
    target: 'externalDocs',
    docs: '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation for this message.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindings',
    docs: '[Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the message.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'bindings',
    docs: '[Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the message.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'examples',
    docs: '[[Message Example Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageExampleObject)\\]\n\\\n\\\nList of examples.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'examples',
    docs: '[[Message Example Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageExampleObject)\\]\n\\\n\\\nList of examples.',
    targetSpecs: AsyncAPI3,
  },
  {
    docs: '#### [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageTraitObject)\n\nDescribes a trait that MAY be applied to a [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject). This object MAY contain any property from the [Message Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObject), except `payload` and `traits`.\n\nIf you\'re looking to apply traits to an operation, see the [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#operationTraitObject).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nmessageId | `string` | Unique string used to identify the message. The id MUST be unique among all messages described in the API. The messageId value is **case-sensitive**. Tools and libraries MAY use the messageId to uniquely identify a message, therefore, it is RECOMMENDED to follow common programming naming conventions.\nheaders | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | Schema definition of the application headers. Schema MUST be of type "object". It **MUST NOT** define the protocol headers.\ncorrelationId | [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#correlationIdObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | Definition of the correlation ID used for message tracing or matching.\n<a name="messageTraitObjectSchemaFormat"></a>schemaFormat | `string` | A string containing the name of the schema format/language used to define the message payload. If omitted, implementations should parse the payload as a [Schema object](#schemaObject).\n<a name="messageTraitObjectContentType"></a>contentType | `string` | The content type to use when encoding/decoding a message\'s payload. The value MUST be a specific media type (e.g. `application/json`). When omitted, the value MUST be the one specified on the [defaultContentType](https://www.asyncapi.com/docs/reference/specification/v2.6.0#defaultContentTypeString) field.\nname | `string` | A machine-friendly name for the message.\ntitle | `string` | A human-friendly title for the message.\nsummary | `string` | A short summary of what the message is about.\ndescription | `string` | A verbose explanation of the message. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntags | [Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#tagsObject) | A list of tags for logical grouping and categorization of messages.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#externalDocumentationObject) | Additional external documentation for this message.\nbindings | [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the message.\nexamples | [[Message Example Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageExampleObject)] | List of examples.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Message Trait Object Example\n\n\n\\\nJSON\n```json\n{\n  "schemaFormat": "application/vnd.apache.avro+json;version=1.9.0",\n  "contentType": "application/json"\n}\n```\n\n\n\\\nYAML\n```yaml\nschemaFormat: \'application/vnd.apache.avro+yaml;version=1.9.0\'\ncontentType: application/json\n```',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject)\n\nDescribes a trait that MAY be applied to a [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject). This object MAY contain any property from the [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject), except `payload` and `traits`.\n\nIf you\'re looking to apply traits to an operation, see the [Operation Trait Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationTraitObject).\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nheaders | [Multi Format Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) &#124; [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | Schema definition of the application headers. Schema MUST be a map of key-value pairs. It **MUST NOT** define the protocol headers. If this is a Schema Object, then the schemaFormat will be assumed to be "application/vnd.aai.asyncapi+json;version=asyncapi" where the version is equal to the AsyncAPI Version String.\ncorrelationId | [Correlation ID Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#correlationIdObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | Definition of the correlation ID used for message tracing or matching.\ncontentType | `string` | The content type to use when encoding/decoding a message\'s payload. The value MUST be a specific media type (e.g. `application/json`). When omitted, the value MUST be the one specified on the [defaultContentType](https://www.asyncapi.com/docs/reference/specification/v3.0.0#defaultContentTypeString) field.\nname | `string` | A machine-friendly name for the message.\ntitle | `string` | A human-friendly title for the message.\nsummary | `string` | A short summary of what the message is about.\ndescription | `string` | A verbose explanation of the message. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntags | Array of [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) | A list of tags for logical grouping and categorization of messages.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | Additional external documentation for this message.\nbindings | [Message Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageBindingsObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the message.\nexamples | [[Message Example Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageExampleObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)] | List of examples.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions).\n\n##### Message Trait Object Example\n\n\n\\\nJSON\n```json\n{\n  "contentType": "application/json"\n}\n```\n\n\n\\\nYAML\n```yaml\ncontentType: application/json\n```',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
