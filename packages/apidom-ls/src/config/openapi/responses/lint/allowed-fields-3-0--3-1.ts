import { range } from 'ramda';
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

/**
 * Validation here is based on IANA HTTP Status code registry: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 *
 * Clarification of OpenAPI specification what are accepted HTTP Status code comes from https://github.com/OAI/OpenAPI-Specification/issues/2471.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message:
    'Responses Object uses HTTP Status Codes outside of allowed IANA HTTP Status code registry',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    ['default', '1XX', '2XX', '3XX', '4XX', '5XX', ...range(100, 600).map(String)],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI3,
};

export default allowedFields3_0__3_1Lint;
