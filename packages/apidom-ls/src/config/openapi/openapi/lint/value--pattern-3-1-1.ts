import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI311 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_1_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPENAPI_VALUE_PATTERN_3_1_1,
  source: 'apilint',
  message: "'openapi' value must be 3.1.1",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.1\\.1'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '3.1.1'",
        action: 'updateValue',
        functionParams: ['3.1.1'],
      },
    ],
  },
  targetSpecs: OpenAPI311,
};

export default valuePattern3_1_1Lint;
