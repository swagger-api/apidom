import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const versionRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_VERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'version' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['version'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'version' field",
        action: 'addChild',
        snippetYaml: "version: ''\n",
        snippetJson: '"version": "",\n',
      },
    ],
  },
};

export default versionRequiredLint;
