import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const inRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_IN_REQUIRED,
  source: 'apilint',
  message: "should always have a 'in'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'in' field",
        action: 'addChild',
        snippetYaml: 'in: \n  ',
        snippetJson: '"in": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
  ],
  targetSpecs: OpenAPI3,
};

export default inRequiredLint;
