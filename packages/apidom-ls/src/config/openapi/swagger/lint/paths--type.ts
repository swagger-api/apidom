import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const pathsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_PATHS_TYPE,
  source: 'apilint',
  message: 'paths must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['paths']],
  marker: 'value',
  target: 'paths',
  data: {},
  targetSpecs: OpenAPI2,
};

export default pathsTypeLint;
