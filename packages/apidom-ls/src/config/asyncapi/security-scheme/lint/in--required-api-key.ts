import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const inRequiredApiKeyLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_IN_REQUIRED_API_KEY,
  source: 'apilint',
  message: "should always have a 'in' when type=apiKey",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
  ],
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
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default inRequiredApiKeyLint;
