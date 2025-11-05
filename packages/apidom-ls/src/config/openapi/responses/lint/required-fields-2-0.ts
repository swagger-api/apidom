import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const requiredFields2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSES_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'Responses Object should define at least one response',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIEmptyResponses',
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default requiredFields2_0Lint;
