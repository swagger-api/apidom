import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const namespaceRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_NAMESPACE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'namespace'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['namespace'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'namespace' field",
        action: 'addChild',
        snippetYaml: 'namespace: \n  ',
        snippetJson: '"namespace": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default namespaceRequiredLint;
