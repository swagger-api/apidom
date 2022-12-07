import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REQUEST_BODY_FIELD_REQUIRED_TYPE,
  source: 'apilint',
  message: 'required must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'required',
  data: {},
};

export default requiredTypeLint;
