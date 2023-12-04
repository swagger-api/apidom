import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const emailFormatEmailLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_CONTACT_FIELD_EMAIL_FORMAT_EMAIL,
  source: 'apilint',
  message: "'email' must be a valid email",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['.+@{1}.+'],
  marker: 'value',
  target: 'email',
  data: {},
  targetSpecs: OpenAPI3,
};

export default emailFormatEmailLint;
