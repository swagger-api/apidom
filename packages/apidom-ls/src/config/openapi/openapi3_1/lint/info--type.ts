import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

const infoTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_INFO_TYPE,
  source: 'apilint',
  message: 'info must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['info']],
  marker: 'value',
  target: 'info',
  data: {},
  targetSpecs: OpenAPI31,
};

export default infoTypeLint;
