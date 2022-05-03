import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const rootAsyncapiLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION,
  source: 'apilint',
  message: 'asyncapi must be one of 2.0.0, 2.1.0, 2.2.0, 2.3.0 or 2.4.0',
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^2\\.[0123]\\.0$'],
  marker: 'value',
  target: 'asyncapi',
  data: {
    quickFix: [
      {
        message: "update to '2.0.0'",
        action: 'updateValue',
        functionParams: ['2.0.0'],
      },
      {
        message: "update to '2.1.0'",
        action: 'updateValue',
        functionParams: ['2.1.0'],
      },
      {
        message: "update to '2.2.0'",
        action: 'updateValue',
        functionParams: ['2.2.0'],
      },
      {
        message: "update to '2.3.0'",
        action: 'updateValue',
        functionParams: ['2.3.0'],
      },
      {
        message: "update to '2.4.0'",
        action: 'updateValue',
        functionParams: ['2.4.0'],
      },
    ],
  },
};

export default rootAsyncapiLint;
