import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const authorizationUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_AUTHORIZATION_URL_REQUIRED,
  source: 'apilint',
  message:
    "should always have a 'authorizationUrl' when 'type' is 'oauth2' and 'flow' is 'implicit' or 'accessCode'",
  severity: DiagnosticSeverity.Error,
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['oauth2'],
    },
    {
      targets: [{ path: 'flow' }],
      function: 'apilintValueOrArray',
      params: [['implicit', 'accessCode']],
    },
  ],
  targetSpecs: OpenAPI2,
};

export default authorizationUrlRequiredLint;
