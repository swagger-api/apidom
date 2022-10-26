import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const httpCode3_0CompletionRule = {
  kind: 14,
  format: CompletionFormat.OBJECT,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: {
    kind: 'markdown',
    value:
      "[Response Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#responseObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)\n\\\n\\\nThe documentation of responses other than the ones declared for specific HTTP response codes. Use this field to cover undeclared responses. A [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject) can link to a response that the [OpenAPI Object's components/responses](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsResponses) section defines.",
  },
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
  ],
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
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

const completion: ApidomCompletionItem[] = [
  {
    label: 'default',
    insertText: 'default',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '100',
    insertText: '100',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '101',
    insertText: '101',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '1XX',
    insertText: '1XX',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '201',
    insertText: '201',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '202',
    insertText: '202',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '203',
    insertText: '203',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '204',
    insertText: '204',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '205',
    insertText: '205',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '2XX',
    insertText: '2XX',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '300',
    insertText: '300',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '301',
    insertText: '301',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '302',
    insertText: '302',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '303',
    insertText: '303',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '305',
    insertText: '305',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '306',
    insertText: '306',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '307',
    insertText: '307',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '3XX',
    insertText: '3XX',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '400',
    insertText: '400',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '402',
    insertText: '402',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '403',
    insertText: '403',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '404',
    insertText: '404',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '405',
    insertText: '405',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '406',
    insertText: '406',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '408',
    insertText: '408',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '409',
    insertText: '409',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '410',
    insertText: '410',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '411',
    insertText: '411',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '413',
    insertText: '413',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '414',
    insertText: '414',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '415',
    insertText: '415',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '417',
    insertText: '417',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '426',
    insertText: '426',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '4XX',
    insertText: '4XX',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '500',
    insertText: '500',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '501',
    insertText: '501',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '502',
    insertText: '502',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '503',
    insertText: '503',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '504',
    insertText: '504',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '505',
    insertText: '505',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
  {
    label: '5XX',
    insertText: '5XX',
    ...httpCode3_0CompletionRule,
    ...httpCode3_1CompletionRule,
  } as ApidomCompletionItem,
];

export default completion;
