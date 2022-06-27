import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tagNameRequiredLint: LinterMeta = {
  code: ApilintCodes.TAG_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'name' field",
        action: 'addChild',
        snippetYaml: 'name: \n  ',
        snippetJson: '"name": "",\n    ',
      },
    ],
  },
};

export default tagNameRequiredLint;
