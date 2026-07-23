import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const scopesRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_CLIENT_CREDENTIALS_OAUTH_FLOW_FIELD_SCOPES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scopes' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['scopes'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'scopes' field",
        action: 'addChild',
        snippetYaml: 'scopes: \n  \n',
        snippetJson: '"scopes": {\n  \n  },\n',
      },
    ],
  },
};

export default scopesRequiredLint;
