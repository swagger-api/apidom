import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Implicit flow.',
    },
    targetSpecs: AsyncAPI2,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Implicit flow.',
    },
    targetSpecs: AsyncAPI3,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Resource Owner Protected Credentials flow.',
    },
    targetSpecs: AsyncAPI2,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Resource Owner Protected Credentials flow.',
    },
    targetSpecs: AsyncAPI3,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Client Credentials flow.',
    },
    targetSpecs: AsyncAPI2,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Client Credentials flow.',
    },
    targetSpecs: AsyncAPI3,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Authorization Code flow.',
    },
    targetSpecs: AsyncAPI2,
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Authorization Code flow.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
