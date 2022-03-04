import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mainInfoRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ASYNCAPIVERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'info' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['info'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'info' section",
        action: 'addChild',
        snippetYaml: 'info: \n  \n',
        snippetJson: '"info": {\n  \n  },\n',
      },
    ],
  },
};

export default mainInfoRequiredLint;
