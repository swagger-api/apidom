import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI302 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_2Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPENAPI_VALUE_PATTERN_3_0_2,
  source: 'apilint',
  message: "'openapi' value must be 3.0.2",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.2'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '3.0.2'",
        action: 'updateValue',
        functionParams: ['3.0.2'],
      },
    ],
  },
  targetSpecs: OpenAPI302,
};

export default valuePattern3_0_2Lint;
