import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const requiredFields3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSES_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'Responses Object should define at least one response',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIEmptyResponses',
  marker: 'key',
  targetSpecs: OpenAPI3,
};

export default requiredFields3_0__3_1Lint;
