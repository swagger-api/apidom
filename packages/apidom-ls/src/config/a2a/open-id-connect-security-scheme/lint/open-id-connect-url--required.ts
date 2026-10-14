import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const openIdConnectUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_OPEN_ID_CONNECT_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_REQUIRED,
  source: 'apilint',
  message: "should always have an 'openIdConnectUrl' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['openIdConnectUrl'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'openIdConnectUrl' field",
        action: 'addChild',
        snippetYaml: "openIdConnectUrl: ''\n",
        snippetJson: '"openIdConnectUrl": "",\n',
      },
    ],
  },
};

export default openIdConnectUrlRequiredLint;
