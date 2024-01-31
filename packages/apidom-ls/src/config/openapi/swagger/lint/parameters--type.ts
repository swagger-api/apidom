import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: '"parameters" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['parametersDefinitions']],
  marker: 'value',
  target: 'parameters',
  data: {},
  targetSpecs: OpenAPI2,
};

export default parametersTypeLint;
