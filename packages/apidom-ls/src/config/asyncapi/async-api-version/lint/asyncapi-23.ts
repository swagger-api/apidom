import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const asyncapiVersionLint23: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_23,
  source: 'apilint',
  message: "'asyncapi' value must be 2.3.0",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['2\\.3\\.0'],
  marker: 'value',
  targetSpecs: [{ namespace: 'asyncapi', version: '2.3.0' }],
  data: {
    quickFix: [
      {
        message: "update to '2.3.0'",
        action: 'updateValue',
        functionParams: ['2.3.0'],
      },
    ],
  },
};

export default asyncapiVersionLint23;
