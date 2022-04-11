import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoVersionRequiredLint: LinterMeta = {
  code: ApilintCodes.INFO_VERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'version'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['version'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'version' field",
        action: 'addChild',
        snippetYaml: 'version: \n  ',
        snippetJson: '"version": "",\n    ',
      },
    ],
  },
};

export default infoVersionRequiredLint;
