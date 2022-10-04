import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const httpCodeCompletionRule3_0 = {
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

const completion: ApidomCompletionItem[] = [
  {
    label: 'default',
    insertText: 'default',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '100',
    insertText: '100',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '101',
    insertText: '101',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '1XX',
    insertText: '1XX',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '201',
    insertText: '201',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '202',
    insertText: '202',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '203',
    insertText: '203',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '204',
    insertText: '204',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '205',
    insertText: '205',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '2XX',
    insertText: '2XX',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '300',
    insertText: '300',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '301',
    insertText: '301',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '302',
    insertText: '302',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '303',
    insertText: '303',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '305',
    insertText: '305',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '306',
    insertText: '306',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '307',
    insertText: '307',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '3XX',
    insertText: '3XX',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '400',
    insertText: '400',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '402',
    insertText: '402',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '403',
    insertText: '403',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '404',
    insertText: '404',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '405',
    insertText: '405',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '406',
    insertText: '406',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '408',
    insertText: '408',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '409',
    insertText: '409',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '410',
    insertText: '410',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '411',
    insertText: '411',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '413',
    insertText: '413',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '414',
    insertText: '414',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '415',
    insertText: '415',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '417',
    insertText: '417',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '426',
    insertText: '426',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '4XX',
    insertText: '4XX',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '500',
    insertText: '500',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '501',
    insertText: '501',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '502',
    insertText: '502',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '503',
    insertText: '503',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '504',
    insertText: '504',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '505',
    insertText: '505',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
  {
    label: '5XX',
    insertText: '5XX',
    ...httpCodeCompletionRule3_0,
  } as ApidomCompletionItem,
];

export default completion;
