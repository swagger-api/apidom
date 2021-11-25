import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoVersionLint: LinterMeta = {
  code: ApilintCodes.INFO_VERSION,
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

export default infoVersionLint;
