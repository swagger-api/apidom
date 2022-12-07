import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoRequiredLint: LinterMeta = {
  code: ApilintCodes.ADS_MAIN_FIELD_INFO_REQUIRED,
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

export default infoRequiredLint;
