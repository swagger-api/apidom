import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const allowReservedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_ENCODING_FIELD_ALLOW_RESERVED_TYPE,
  source: 'apilint',
  message: 'allowReserved must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'allowReserved',
  data: {},
  targetSpecs: OpenAPI30,
};

export default allowReservedTypeLint;
