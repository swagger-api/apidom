import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeOpenIdConnectUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_OPEN_ID_CONNECT_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'openIdConnectUrl'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['openIdConnectUrl'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['openIdConnect'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'openIdConnectUrl' field",
        action: 'addChild',
        snippetYaml: 'openIdConnectUrl: \n  ',
        snippetJson: '"openIdConnectUrl": "",\n    ',
      },
    ],
  },
};

export default securitySchemeOpenIdConnectUrlRequiredLint;
