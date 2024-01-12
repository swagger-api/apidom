import { range } from 'ramda';
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

/**
 * Validation here is based on IANA HTTP Status code registry: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 *
 * Clarification of OpenAPI specification what are accepted HTTP Status code comes from https://github.com/OAI/OpenAPI-Specification/issues/2471.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message:
    'Responses Object uses HTTP Status Codes outside of allowed IANA HTTP Status code registry',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['default', ...range(100, 600).map(String)], 'x-'],
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default allowedFields2_0Lint;
