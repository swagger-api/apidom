import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPENAPI_VALUE_PATTERN_3_0_1,
  source: 'apilint',
  message: "'openapi' value must be 3.0.1",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.1'],
  marker: 'value',
  targetSpecs: [{ namespace: 'openapi', version: '3.0.1' }],
  data: {
    quickFix: [
      {
        message: "update to '3.0.1'",
        action: 'updateValue',
        functionParams: ['3.0.1'],
      },
    ],
  },
};

export default valuePattern3_0_1Lint;
