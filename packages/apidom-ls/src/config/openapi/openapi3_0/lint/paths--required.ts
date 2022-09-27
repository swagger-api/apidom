import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const pathsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_PATHS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'paths' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['paths'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'paths' section",
        action: 'addChild',
        snippetYaml: 'paths: \n  \n',
        snippetJson: '"paths": {\n  \n  },\n',
      },
    ],
  },
};

export default pathsRequiredLint;
