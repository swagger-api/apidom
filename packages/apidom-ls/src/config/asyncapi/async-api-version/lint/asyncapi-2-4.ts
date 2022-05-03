import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const asyncapiVersionLint24: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_2_4,
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

export default asyncapiVersionLint24;
