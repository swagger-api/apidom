import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const queuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SQS_OPERATION_BINDING_FIELD_QUEUES_TYPE,
  source: 'apilint',
  message: "'queues' value must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'queues',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default queuesTypeLint;
