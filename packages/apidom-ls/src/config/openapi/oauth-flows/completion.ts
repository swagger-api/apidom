import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';
import { OpenAPI30, OpenAPI31 } from '../target-specs';

const completion: ApidomCompletionItem[] = [
  {
    label: 'implicit',
    insertText: 'implicit',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Implicit flow.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'implicit',
    insertText: 'implicit',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Implicit flow.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'password',
    insertText: 'password',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Resource Owner Password flow.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'password',
    insertText: 'password',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Resource Owner Password flow.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'clientCredentials',
    insertText: 'clientCredentials',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'clientCredentials',
    insertText: 'clientCredentials',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Client Credentials flow. Previously called `application` in OpenAPI 2.0.',
    },
    targetSpecs: OpenAPI31,
  },
  {
    label: 'authorizationCode',
    insertText: 'clientCredentials',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.',
    },
    targetSpecs: OpenAPI30,
  },
  {
    label: 'authorizationCode',
    insertText: 'clientCredentials',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.',
    },
    targetSpecs: OpenAPI31,
  },
];

export default completion;
