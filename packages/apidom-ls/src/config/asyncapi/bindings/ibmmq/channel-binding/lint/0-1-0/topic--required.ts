import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const topicRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_TOPIC_REQUIRED,
  source: 'apilint',
  message: "should always have a 'topic'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['topic'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'destinationType' }],
      function: 'apilintContainsValue',
      params: ['topic'],
    },
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'topic' field",
        action: 'addChild',
        snippetYaml: 'topic: \n  ',
        snippetJson: '"topic": {},\n    ',
      },
    ],
  },
};

export default topicRequiredLint;
