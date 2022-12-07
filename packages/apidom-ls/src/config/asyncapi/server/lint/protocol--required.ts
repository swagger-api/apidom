import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const protocolRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_PROTOCOL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'protocol'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['protocol'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'protocol'",
        action: 'addChild',
        snippetYaml: 'protocol: \n    ',
        snippetJson: '"protocol": "",\n      ',
      },
    ],
  },
};

export default protocolRequiredLint;
