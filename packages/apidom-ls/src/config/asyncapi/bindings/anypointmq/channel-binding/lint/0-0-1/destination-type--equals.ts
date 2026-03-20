import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const destinationTypeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ANYPOINTMQ_CHANNEL_BINDING_FIELD_DESTINATION_TYPE_EQUALS,
  source: 'apilint',
  message: 'destinationType must be one of allowed values',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['queue', 'exchange', 'fifo-queue']],
  marker: 'value',
  target: 'destinationType',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.0.1']],
    },
  ],
};

export default destinationTypeEqualsLint;
