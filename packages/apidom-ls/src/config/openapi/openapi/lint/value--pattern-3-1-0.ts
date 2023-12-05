import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_1_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPENAPI_VALUE_PATTERN_3_1_0,
  source: 'apilint',
  message: "'openapi' value must be 3.1.0",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.1\\.0'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '3.1.0'",
        action: 'updateValue',
        functionParams: ['3.1.0'],
      },
    ],
  },
  targetSpecs: OpenAPI31,
};

export default valuePattern3_1_0Lint;
