import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const schemeWrapperField = (label: string, docs: string): ApidomCompletionItem => ({
  label,
  insertText: label,
  kind: 14,
  format: CompletionFormat.OBJECT,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: { kind: 'markdown', value: docs },
  targetSpecs: A2A1,
});

const completion: ApidomCompletionItem[] = [
  schemeWrapperField('apiKeySecurityScheme', 'API key authentication scheme.'),
  schemeWrapperField(
    'httpAuthSecurityScheme',
    'HTTP authentication scheme (Basic, Bearer, etc., per RFC 7235).',
  ),
  schemeWrapperField('mtlsSecurityScheme', 'Mutual TLS authentication scheme.'),
  schemeWrapperField('oauth2SecurityScheme', 'OAuth 2.0 authentication scheme.'),
  schemeWrapperField('openIdConnectSecurityScheme', 'OpenID Connect authentication scheme.'),
];

export default completion;
