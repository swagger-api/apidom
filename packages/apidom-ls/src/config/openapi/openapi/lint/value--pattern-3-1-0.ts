import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_1_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPENAPI_VALUE_PATTERN_3_1_0,
  source: 'apilint',
  message: "'openapi' value must be 3.1.0",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.1\\.0'],
  marker: 'value',
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  data: {
    quickFix: [
      {
        message: "update to '3.1.0'",
        action: 'updateValue',
        functionParams: ['3.1.0'],
      },
    ],
  },
};

export default valuePattern3_1_0Lint;
