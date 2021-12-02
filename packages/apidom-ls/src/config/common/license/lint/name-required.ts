import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const licenseNameRequiredLint: LinterMeta = {
  code: ApilintCodes.LICENSE_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name' value",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'name' section",
        action: 'addChild',
        snippetYaml: "name: ''\n",
        snippetJson: '"name": "",\n',
      },
    ],
  },
};

export default licenseNameRequiredLint;
