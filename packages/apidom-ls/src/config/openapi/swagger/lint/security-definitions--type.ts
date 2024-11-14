import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const securityDefinitionsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_SECURITY_DEFINITIONS_TYPE,
  source: 'apilint',
  message: '"securityDefinitions" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['securityDefinitions']],
  marker: 'value',
  target: 'securityDefinitions',
  data: {},
  targetSpecs: OpenAPI2,
};

export default securityDefinitionsTypeLint;
