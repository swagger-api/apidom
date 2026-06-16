import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const flowField = (label: string, docs: string): ApidomCompletionItem => ({
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
  flowField('authorizationCode', 'OAuth 2.0 Authorization Code flow configuration.'),
  flowField('clientCredentials', 'OAuth 2.0 Client Credentials flow configuration.'),
  flowField('deviceCode', 'OAuth 2.0 Device Authorization Grant flow configuration.'),
  flowField('implicit', 'OAuth 2.0 Implicit flow configuration.'),
  flowField('password', 'OAuth 2.0 Resource Owner Password flow configuration.'),
];

export default completion;
