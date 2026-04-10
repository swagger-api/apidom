import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const exampleDateTimeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLE_DATE_TIME,
  source: 'apilint',
  message: 'example value must be a valid date-time string (RFC 3339)',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidDateTimeExample',
  linterParams: [],
  marker: 'value',
  target: 'example',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
  conditions: [
    {
      targets: [{ path: 'format' }],
      function: 'apilintValueOrArray',
      params: [['date-time']],
    },
  ],
};

export default exampleDateTimeLint;
