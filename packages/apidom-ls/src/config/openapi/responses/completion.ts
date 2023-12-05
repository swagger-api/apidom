import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31 } from '../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const httpCode3_0CompletionItem = {
  kind: 14,
  format: CompletionFormat.OBJECT,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: {
    kind: 'markdown',
    value:
      "[Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)\n\\\n\\\nThe documentation of responses other than the ones declared for specific HTTP response codes. Use this field to cover undeclared responses. A [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) can link to a response that the [OpenAPI Object's components/responses](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsResponses) section defines.",
  },
  targetSpecs: OpenAPI30,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const httpCode3_1CompletionRule = {
  kind: 14,
  format: CompletionFormat.OBJECT,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: {
    kind: 'markdown',
    value:
      '[Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responseObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)\n\\\n\\\nThe documentation of responses other than the ones declared for specific HTTP response codes. Use this field to cover undeclared responses.',
  },
  targetSpecs: OpenAPI31,
};

const completion: ApidomCompletionItem[] = [
  {
    label: 'default',
    insertText: 'default',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: 'default',
    insertText: 'default',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '1XX',
    insertText: '1XX',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: '1XX',
    insertText: '1XX',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '2XX',
    insertText: '2XX',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: '2XX',
    insertText: '2XX',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '3XX',
    insertText: '3XX',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: '3XX',
    insertText: '3XX',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '4XX',
    insertText: '4XX',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: '4XX',
    insertText: '4XX',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '5XX',
    insertText: '5XX',
    ...httpCode3_0CompletionItem,
  } as ApidomCompletionItem,
  {
    label: '5XX',
    insertText: '5XX',
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
];

export default completion;
