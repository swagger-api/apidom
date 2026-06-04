import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const signatureField = (
  label: string,
  format: CompletionFormat,
  docs: string,
): ApidomCompletionItem => ({
  label,
  insertText: label,
  kind: 14,
  format,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: { kind: 'markdown', value: docs },
  targetSpecs: A2A1,
});

const completion: ApidomCompletionItem[] = [
  signatureField(
    'protected',
    CompletionFormat.QUOTED,
    'Base64url-encoded JWS Protected Header (JOSE).',
  ),
  signatureField(
    'signature',
    CompletionFormat.QUOTED,
    'Base64url-encoded signature value over the AgentCard payload.',
  ),
  signatureField('header', CompletionFormat.OBJECT, 'Unprotected JWS header parameters (JOSE).'),
];

export default completion;
