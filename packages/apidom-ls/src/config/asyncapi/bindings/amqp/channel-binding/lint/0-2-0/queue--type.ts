import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const queueTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_CHANNEL_BINDING_FIELD_QUEUE_TYPE,
  source: 'apilint',
  message: "'queue' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'queue',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default queueTypeLint;
