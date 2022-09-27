import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern3_0_3Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPENAPI_VALUE_PATTERN_3_0_3,
  source: 'apilint',
  message: "'openapi' value must be 3.0.3",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['3\\.0\\.3'],
  marker: 'value',
  targetSpecs: [{ namespace: 'openapi', version: '3.0.3' }],
  data: {
    quickFix: [
      {
        message: "update to '3.0.3'",
        action: 'updateValue',
        functionParams: ['3.0.3'],
      },
    ],
  },
};

export default valuePattern3_0_3Lint;
