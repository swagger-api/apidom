import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPENAPI_VALUE_PATTERN_3_0_0,
  source: 'apilint',
  message: "'openapi' value must be 3.0.0",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.0'],
  marker: 'value',
  targetSpecs: [{ namespace: 'openapi', version: '3.0.0' }],
  data: {
    quickFix: [
      {
        message: "update to '3.0.0'",
        action: 'updateValue',
        functionParams: ['3.0.0'],
      },
    ],
  },
};

export default valuePattern3_0_0Lint;
