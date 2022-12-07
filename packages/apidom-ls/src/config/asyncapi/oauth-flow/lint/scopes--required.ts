import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const scopesRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_SCOPES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scopes'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['scopes'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'scopes' field",
        action: 'addChild',
        snippetYaml: 'scopes: \n  ',
        snippetJson: '"scopes": {},\n    ',
      },
    ],
  },
};

export default scopesRequiredLint;
