import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern2_1_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_VERSION_VALUE_PATTERN_2_1_0,
  source: 'apilint',
  message: "'asyncapi' value must be 2.1.0",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['2\\.1\\.0'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '2.1.0'",
        action: 'updateValue',
        functionParams: ['2.1.0'],
      },
    ],
  },
  targetSpecs: [{ namespace: 'asyncapi', version: '2.1.0' }],
};

export default valuePattern2_1_0Lint;
