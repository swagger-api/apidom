import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const schemaTypeOpenAPI3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: 'schema must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema', 'boolean'],
  marker: 'value',
  target: 'schema',
  data: {},
  targetSpecs: OpenAPI31,
};

export default schemaTypeOpenAPI3_1Lint;
