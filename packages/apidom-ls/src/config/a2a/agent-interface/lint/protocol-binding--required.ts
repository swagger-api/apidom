import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const protocolBindingRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_INTERFACE_FIELD_PROTOCOL_BINDING_REQUIRED,
  source: 'apilint',
  message: "should always have a 'protocolBinding' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['protocolBinding'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'protocolBinding' field",
        action: 'addChild',
        snippetYaml: "protocolBinding: ''\n",
        snippetJson: '"protocolBinding": "",\n',
      },
    ],
  },
};

export default protocolBindingRequiredLint;
