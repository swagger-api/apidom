import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const supportedInterfacesRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_SUPPORTED_INTERFACES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'supportedInterfaces' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['supportedInterfaces'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'supportedInterfaces' field",
        action: 'addChild',
        snippetYaml: 'supportedInterfaces:\n  - \n',
        snippetJson: '"supportedInterfaces": [],\n',
      },
    ],
  },
};

export default supportedInterfacesRequiredLint;
