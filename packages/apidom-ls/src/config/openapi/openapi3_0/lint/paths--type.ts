import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const pathsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_PATHS_TYPE,
  source: 'apilint',
  message: 'paths must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['paths']],
  marker: 'value',
  target: 'paths',
  data: {},
  targetSpecs: OpenAPI30,
};

export default pathsTypeLint;
