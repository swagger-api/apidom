import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const responsesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_RESPONSES_TYPE,
  source: 'apilint',
  message: '"responses" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['responsesDefinitions']],
  marker: 'value',
  target: 'responses',
  data: {},
  targetSpecs: OpenAPI2,
};

export default responsesTypeLint;
