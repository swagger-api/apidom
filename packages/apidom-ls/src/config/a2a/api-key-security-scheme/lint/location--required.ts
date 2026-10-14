import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const locationRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_API_KEY_SECURITY_SCHEME_FIELD_LOCATION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'location' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['location'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'location' field",
        action: 'addChild',
        snippetYaml: "location: ''\n",
        snippetJson: '"location": "",\n',
      },
    ],
  },
};

export default locationRequiredLint;
