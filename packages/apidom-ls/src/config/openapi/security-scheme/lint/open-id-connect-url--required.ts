import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const openIdConnectUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'openIdConnectUrl'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['openIdConnectUrl'],
  marker: 'key',
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['openIdConnect'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
};

export default openIdConnectUrlRequiredLint;
