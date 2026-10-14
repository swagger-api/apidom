import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const schemeRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_HTTP_AUTH_SECURITY_SCHEME_FIELD_SCHEME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scheme' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['scheme'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'scheme' field",
        action: 'addChild',
        snippetYaml: "scheme: ''\n",
        snippetJson: '"scheme": "",\n',
      },
    ],
  },
};

export default schemeRequiredLint;
