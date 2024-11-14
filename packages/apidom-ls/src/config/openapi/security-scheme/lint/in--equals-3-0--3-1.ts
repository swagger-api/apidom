import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const inEquals3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_IN_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'cookie']],
  marker: 'value',
  target: 'in',
  data: {},
  targetSpecs: OpenAPI3,
};

export default inEquals3_0__3_1Lint;
