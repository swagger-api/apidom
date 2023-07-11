import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEqualsLint2_0: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_TYPE_EQUALS_2_2,
  source: 'apilint',
  message:
    'type must be one of allowed values: userPassword, apiKey, X509, symmetricEncryption, asymmetricEncryption, httpApiKey, http, oauth2, openIdConnect',
  severity: DiagnosticSeverity.Error,
  targetSpecs: [{ namespace: 'asyncapi', version: '2.0.0' }],
  linterFunction: 'apilintValueOrArray',
  linterParams: [
    [
      'userPassword',
      'apiKey',
      'X509',
      'symmetricEncryption',
      'asymmetricEncryption',
      'httpApiKey',
      'http',
      'oauth2',
      'openIdConnect',
    ],
    true,
  ],
  marker: 'value',
  target: 'type',
  data: {
    quickFix: [
      {
        message: "update to 'userPassword'",
        action: 'updateValue',
        functionParams: ['userPassword'],
      },
      {
        message: "update to 'apiKey'",
        action: 'updateValue',
        functionParams: ['apiKey'],
      },
      {
        message: "update to 'X509'",
        action: 'updateValue',
        functionParams: ['X509'],
      },
      {
        message: "update to 'symmetricEncryption'",
        action: 'updateValue',
        functionParams: ['symmetricEncryption'],
      },
      {
        message: "update to 'asymmetricEncryption'",
        action: 'updateValue',
        functionParams: ['asymmetricEncryption'],
      },
      {
        message: "update to 'httpApiKey'",
        action: 'updateValue',
        functionParams: ['httpApiKey'],
      },
      {
        message: "update to 'http'",
        action: 'updateValue',
        functionParams: ['http'],
      },
      {
        message: "update to 'oauth2'",
        action: 'updateValue',
        functionParams: ['oauth2'],
      },
      {
        message: "update to 'openIdConnect'",
        action: 'updateValue',
        functionParams: ['openIdConnect'],
      },
      {
        message: 'clear',
        action: 'updateValue',
        functionParams: [''],
      },
    ],
  },
};

export default typeEqualsLint2_0;
