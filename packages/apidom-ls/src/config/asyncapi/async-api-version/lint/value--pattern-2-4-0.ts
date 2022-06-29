import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuePattern2_4_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_VERSION_VALUE_PATTERN_2_4_0,
  source: 'apilint',
  message: "'asyncapi' value must be 2.4.0",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['2\\.4\\.0'],
  marker: 'value',
  targetSpecs: [{ namespace: 'asyncapi', version: '2.4.0' }],
  data: {
    quickFix: [
      {
        message: "update to '2.4.0'",
        action: 'updateValue',
        functionParams: ['2.4.0'],
      },
    ],
  },
};

export default valuePattern2_4_0Lint;
