import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const webhooksRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_WEBHOOKS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'webhooks' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['webhooks'],
  marker: 'key',
  // conditions: [
  //   {
  //     // todo: fix setup so oas31 consists at least oneOf paths, components, webhooks
  //     targets: [{ path: 'openApi3_1' }],
  //     function: 'apilintContainsValue',
  //     params: ['webhooks'],
  //   },
  // ],
  data: {
    quickFix: [
      {
        message: "add 'webhooks' section",
        action: 'addChild',
        snippetYaml: 'webhooks: \n  \n',
        snippetJson: '"webhooks": {\n  \n  },\n',
      },
    ],
  },
};

export default webhooksRequiredLint;
