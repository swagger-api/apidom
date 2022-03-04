import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mainVersionLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION,
  source: 'apilint',
  message: 'version must be "2021-05-07"',
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^2021\\-05\\-07$'],
  marker: 'value',
  target: 'version',
  data: {
    quickFix: [
      {
        message: "update to '2021-05-07'",
        action: 'updateValue',
        functionParams: ['2021-05-07'],
      },
    ],
  },
};

export default mainVersionLint;
