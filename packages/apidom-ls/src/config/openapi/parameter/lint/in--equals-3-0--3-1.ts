import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const inEquals3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values: query, header, path, cookie",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'path', 'cookie']],
  marker: 'value',
  target: 'in',
  data: {},
  targetSpecs: OpenAPI3,
};

export default inEquals3_0__3_1Lint;
