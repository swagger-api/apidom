import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const tokenUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AUTHORIZATION_CODE_OAUTH_FLOW_FIELD_TOKEN_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'tokenUrl' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['tokenUrl'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'tokenUrl' field",
        action: 'addChild',
        snippetYaml: "tokenUrl: ''\n",
        snippetJson: '"tokenUrl": "",\n',
      },
    ],
  },
};

export default tokenUrlRequiredLint;
