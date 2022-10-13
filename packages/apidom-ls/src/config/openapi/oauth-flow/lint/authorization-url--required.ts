import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const authorizationUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'authorizationUrl'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['authorizationUrl'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'authorizationUrl' field",
        action: 'addChild',
        snippetYaml: 'authorizationUrl: \n  ',
        snippetJson: '"authorizationUrl": "",\n    ',
      },
    ],
  },
};

export default authorizationUrlRequiredLint;
