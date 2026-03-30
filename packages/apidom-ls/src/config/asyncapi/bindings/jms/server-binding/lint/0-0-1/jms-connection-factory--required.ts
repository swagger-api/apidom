import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const jmsConnectionFactoryRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_JMS_SERVER_BINDING_FIELD_JMS_CONNECTION_FACTORY_REQUIRED,
  source: 'apilint',
  message: "should always have a 'jmsConnectionFactory'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['jmsConnectionFactory'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'jmsConnectionFactory' field",
        action: 'addChild',
        snippetYaml: 'jmsConnectionFactory: \n  ',
        snippetJson: '"jmsConnectionFactory": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.0.1']],
    },
  ],
};

export default jmsConnectionFactoryRequiredLint;
