import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const asyncapiVersionLint20: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_2_0,
  source: 'apilint',
  message: "'asyncapi' value must be 2.0.0",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['2\\.0\\.0'],
  marker: 'value',
  targetSpecs: [{ namespace: 'asyncapi', version: '2.0.0' }],
  data: {
    quickFix: [
      {
        message: "update to '2.0.0'",
        action: 'updateValue',
        functionParams: ['2.0.0'],
      },
    ],
  },
};

export default asyncapiVersionLint20;
