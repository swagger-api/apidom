import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const requiredFieldsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSES_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'Responses Object should define at least one response',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIEmptyResponses',
  marker: 'key',
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default requiredFieldsLint;
