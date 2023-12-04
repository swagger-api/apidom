import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const explodeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_ENCODING_FIELD_EXPLODE_TYPE,
  source: 'apilint',
  message: 'explode must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'explode',
  data: {},
  targetSpecs: OpenAPI30,
};

export default explodeTypeLint;
