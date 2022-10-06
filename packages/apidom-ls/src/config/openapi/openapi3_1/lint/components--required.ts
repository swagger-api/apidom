import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_COMPONENTS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'components' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['components'],
  marker: 'key',
  // conditions: [
  //   {
  //     // todo: fix setup so oas31 consists at least oneOf paths, components, webhooks
  //     targets: [{ path: 'openApi3_1' }],
  //     function: 'apilintContainsValue',
  //     params: ['components'],
  //   },
  // ],
  data: {
    quickFix: [
      {
        message: "add 'components' section",
        action: 'addChild',
        snippetYaml: 'components: \n  \n',
        snippetJson: '"components": {\n  \n  },\n',
      },
    ],
  },
};

export default componentsRequiredLint;
