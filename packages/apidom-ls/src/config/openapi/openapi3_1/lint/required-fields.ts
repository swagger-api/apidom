import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredFieldsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'OpenAPI Object must contain one the following fields: paths, components, webhooks',
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['paths'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'root' }],
      function: 'missingFields',
      params: [['paths', 'components', 'webhooks']],
    },
  ],
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

export default requiredFieldsLint;
