import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const persistenceRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_PERSISTENCE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'persistence'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['persistence'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'persistence' field",
        action: 'addChild',
        snippetYaml: 'persistence: \n  ',
        snippetJson: '"persistence": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default persistenceRequiredLint;
