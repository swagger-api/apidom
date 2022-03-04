import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mainVersionRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'version' value",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['version'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'version' field",
        action: 'addChild',
        snippetYaml: "version: ''\n",
        snippetJson: '"version": "",\n',
      },
    ],
  },
};

export default mainVersionRequiredLint;
