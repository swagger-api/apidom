import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const inEquals3_2Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values: query, header, path, cookie, querystring",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'path', 'cookie', 'querystring']],
  marker: 'value',
  target: 'in',
  data: {},
  targetSpecs: OpenAPI32,
};

export default inEquals3_2Lint;
