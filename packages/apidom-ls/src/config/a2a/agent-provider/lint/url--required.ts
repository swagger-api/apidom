import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const urlRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_PROVIDER_FIELD_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'url' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['url'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'url' field",
        action: 'addChild',
        snippetYaml: "url: ''\n",
        snippetJson: '"url": "",\n',
      },
    ],
  },
};

export default urlRequiredLint;
