import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const flowField = (
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
  flowField(
    'deviceAuthorizationUrl',
    CompletionFormat.QUOTED,
    'The device authorization endpoint used to obtain a device verification code.',
  ),
  flowField('tokenUrl', CompletionFormat.QUOTED, 'The token URL to be used for this flow.'),
  flowField(
    'refreshUrl',
    CompletionFormat.QUOTED,
    'The URL to be used for obtaining refresh tokens.',
  ),
  flowField(
    'scopes',
    CompletionFormat.OBJECT,
    'Available scopes for the OAuth2 security scheme. A map of scope name to short description.',
  ),
];

export default completion;
