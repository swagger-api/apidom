import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const emailFormatEmailLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CONTACT_FIELD_EMAIL_FORMAT_EMAIL,
  source: 'apilint',
  message: "'email' must be a valid email",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['.+@{1}.+'],
  marker: 'value',
  target: 'email',
  data: {},
};

export default emailFormatEmailLint;
