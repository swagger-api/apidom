import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.SERVER_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'url'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['url'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'url'",
        action: 'addChild',
        snippetYaml: 'url: \n    ',
        snippetJson: '"url": "",\n      ',
      },
    ],
  },
};

export default serverUrlRequiredLint;
