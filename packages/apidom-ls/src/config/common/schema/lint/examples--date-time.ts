import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31, OpenAPI32 } from '../../../openapi/target-specs.ts';

const examplesDateTimeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLES_DATE_TIME,
  source: 'apilint',
  message: 'examples values must be valid date-time strings (RFC 3339)',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidDateTimeExample',
  linterParams: [true],
  marker: 'value',
  target: 'examples',
  data: {},
  targetSpecs: [...OpenAPI31, ...OpenAPI32],
  conditions: [
    {
      targets: [{ path: 'format' }],
      function: 'apilintValueOrArray',
      params: [['date-time']],
    },
  ],
};

export default examplesDateTimeLint;
