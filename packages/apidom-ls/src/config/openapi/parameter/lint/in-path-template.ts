import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const inPathTemplateLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_PATH_TEMPLATE,
  source: 'apilint',
  message: 'parameter is not defined within path template',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIParameterInPathTemplate',
  marker: 'value',
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default inPathTemplateLint;
