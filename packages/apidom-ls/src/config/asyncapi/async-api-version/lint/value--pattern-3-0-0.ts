import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI300 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_VERSION_VALUE_PATTERN_3_0_0,
  source: 'apilint',
  message: "'asyncapi' value must be 3.0.0",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.0'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '3.0.0'",
        action: 'updateValue',
        functionParams: ['3.0.0'],
      },
    ],
  },
  targetSpecs: AsyncAPI300,
};

export default valuePattern3_0_0Lint;
