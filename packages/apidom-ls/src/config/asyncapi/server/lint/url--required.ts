import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const urlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'url'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['url'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
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

export default urlRequiredLint;
