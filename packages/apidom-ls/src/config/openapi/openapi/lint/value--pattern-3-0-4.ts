import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI304 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_4Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPENAPI_VALUE_PATTERN_3_0_4,
  source: 'apilint',
  message: "'openapi' value must be 3.0.4",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.4'],
  marker: 'value',
  data: {
    quickFix: [
      {
        message: "update to '3.0.4'",
        action: 'updateValue',
        functionParams: ['3.0.4'],
      },
    ],
  },
  targetSpecs: OpenAPI304,
};

export default valuePattern3_0_4Lint;
