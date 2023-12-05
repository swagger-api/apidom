import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const responsesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_RESPONSES_TYPE,
  source: 'apilint',
  message: 'responses must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['responses'],
  marker: 'value',
  target: 'responses',
  data: {},
  targetSpecs: OpenAPI3,
};

export default responsesTypeLint;
