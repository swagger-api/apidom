import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const scopesRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_SCOPES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scopes' when type='oauth2'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['scopes'],
  marker: 'key',
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['oauth2'],
    },
  ],
  targetSpecs: OpenAPI2,
};

export default scopesRequiredLint;
