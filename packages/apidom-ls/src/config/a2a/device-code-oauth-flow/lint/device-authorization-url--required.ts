import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const deviceAuthorizationUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_DEVICE_CODE_OAUTH_FLOW_FIELD_DEVICE_AUTHORIZATION_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'deviceAuthorizationUrl' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['deviceAuthorizationUrl'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'deviceAuthorizationUrl' field",
        action: 'addChild',
        snippetYaml: "deviceAuthorizationUrl: ''\n",
        snippetJson: '"deviceAuthorizationUrl": "",\n',
      },
    ],
  },
};

export default deviceAuthorizationUrlRequiredLint;
