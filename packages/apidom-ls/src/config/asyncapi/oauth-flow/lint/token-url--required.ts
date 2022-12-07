import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tokenUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_TOKEN_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'tokenUrl'",
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
};

export default tokenUrlRequiredLint;
