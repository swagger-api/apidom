import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const pathsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_PATHS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'paths' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['paths'],
  marker: 'key',
  // conditions: [
  //   {
  //     // todo: fix setup so oas31 consists at least oneOf paths, components, webhooks
  //     targets: [{ path: 'openApi3_1' }],
  //     function: 'apilintContainsValue',
  //     params: ['paths'],
  //   },
  // ],
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
