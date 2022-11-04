import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types';

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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Implicit flow.',
    },
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Resource Owner Protected Credentials flow.',
    },
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Client Credentials flow.',
    },
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
        '[OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject)\n\\\n\\\nConfiguration for the OAuth Authorization Code flow.',
    },
  },
];

export default completion;
