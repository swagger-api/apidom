import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const queueTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_QUEUE_TYPE,
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
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default queueTypeLint;
