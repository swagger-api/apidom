import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const openIdConnectUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'openIdConnectUrl'",
  severity: DiagnosticSeverity.Error,
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

export default openIdConnectUrlRequiredLint;
