import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const tokenUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_TOKEN_URL_REQUIRED,
  source: 'apilint',
  message:
    "should always have a 'tokenUrl' when 'type' is 'oauth2' and 'flow' is 'password', 'application' or 'accessCode'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['tokenUrl'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'tokenUrl' field",
        action: 'addChild',
        snippetYaml: 'tokenUrl: \n  ',
        snippetJson: '"tokenUrl": "",\n    ',
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
      params: [['password', 'application', 'accessCode']],
    },
  ],
  targetSpecs: OpenAPI2,
};

export default tokenUrlRequiredLint;
