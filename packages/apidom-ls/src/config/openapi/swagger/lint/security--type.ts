import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: '"security" must be an array of Security Requirement Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'value',
  target: 'security',
  data: {},
  targetSpecs: OpenAPI2,
};

export default securityTypeLint;
