import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const versionRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_VERSION_REQUIRED,
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

export default versionRequiredLint;
