import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const protocolVersionRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_INTERFACE_FIELD_PROTOCOL_VERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'protocolVersion' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['protocolVersion'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'protocolVersion' field",
        action: 'addChild',
        snippetYaml: "protocolVersion: ''\n",
        snippetJson: '"protocolVersion": "",\n',
      },
    ],
  },
};

export default protocolVersionRequiredLint;
