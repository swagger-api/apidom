import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const nameRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_API_KEY_SECURITY_SCHEME_FIELD_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'name' field",
        action: 'addChild',
        snippetYaml: "name: ''\n",
        snippetJson: '"name": "",\n',
      },
    ],
  },
};

export default nameRequiredLint;
