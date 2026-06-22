import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const authorizationUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AUTHORIZATION_CODE_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_REQUIRED,
  source: 'apilint',
  message: "should always have an 'authorizationUrl' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['authorizationUrl'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'authorizationUrl' field",
        action: 'addChild',
        snippetYaml: "authorizationUrl: ''\n",
        snippetJson: '"authorizationUrl": "",\n',
      },
    ],
  },
};

export default authorizationUrlRequiredLint;
