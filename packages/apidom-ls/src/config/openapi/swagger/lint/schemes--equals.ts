import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const schemesEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_SCHEMES_EQUALS,
  source: 'apilint',
  message: "'schemes' must be list of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['http', 'https', 'ws', 'wss']],
  marker: 'key',
  target: 'schemes',
  data: {},
  targetSpecs: OpenAPI2,
};

export default schemesEqualsLint;
