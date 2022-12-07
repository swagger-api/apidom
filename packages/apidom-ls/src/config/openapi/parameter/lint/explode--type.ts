import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const explodeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_EXPLODE_TYPE,
  source: 'apilint',
  message: 'explode must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'explode',
  data: {},
};

export default explodeTypeLint;
