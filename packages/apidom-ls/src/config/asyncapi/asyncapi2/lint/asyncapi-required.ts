import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const rootAsyncapiRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'asyncapi' value",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['asyncapi'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'asyncapi' section",
        action: 'addChild',
        snippetYaml: "asyncapi: ''\n",
        snippetJson: '"asyncapi": "",\n',
      },
    ],
  },
};

export default rootAsyncapiRequiredLint;
