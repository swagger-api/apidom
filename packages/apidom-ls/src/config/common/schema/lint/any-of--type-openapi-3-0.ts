import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

/*
TODO remove specific rule fo OAS 3.0 when underlying issue has been fixed (missing referenced-element in ref)
see
  https://github.com/swagger-api/swagger-editor/issues/3722
  https://github.com/swagger-api/swagger-editor/issues/4026
 */
const anyOfTypeOpenApi30Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ANYOF_OPENAPI_3_0,
  source: 'apilint',
  message: 'anyOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'reference'], true],
  marker: 'key',
  target: 'anyOf',
  data: {},
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
  ],
};

export default anyOfTypeOpenApi30Lint;
