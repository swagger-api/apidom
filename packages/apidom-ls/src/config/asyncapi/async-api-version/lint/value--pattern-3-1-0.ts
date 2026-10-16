import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI310 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_1_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_VERSION_VALUE_PATTERN_3_1_0,
  source: 'apilint',
  message: "'asyncapi' value must be 3.1.0",
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
  targetSpecs: AsyncAPI310,
};

export default valuePattern3_1_0Lint;
