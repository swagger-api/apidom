import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'schemaFormat',
    insertText: 'schemaFormat',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A string containing the name of the schema format that is used to define the message payload. If omitted, implementations should parse the payload as a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject). When the payload is defined using a $ref to a remote file, it is RECOMMENDED the schema format includes the file encoding type to allow implementations to parse the file correctly. E.g., adding +yaml if content type is application/vnd.apache.avro results in application/vnd.apache.avro+yaml.\\\n\\\nCheck out the [supported schema formats table](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaFormatTable) for more information. Custom values are allowed but their implementation is OPTIONAL. A custom value MUST NOT refer to one of the schema formats listed in the [table](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaFormatTable).',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'schema',
    insertText: 'schema',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Definition of the message payload. It can be of any type but defaults to [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject). It MUST match the schema format defined in [schemaFormat](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObjectSchemaFormat), including the encoding type. E.g., Avro should be inlined as either a YAML or JSON object instead of as a string to be parsed as YAML or JSON. Non-JSON-based schemas (e.g., Protobuf or XSD) MUST be inlined as a string.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
