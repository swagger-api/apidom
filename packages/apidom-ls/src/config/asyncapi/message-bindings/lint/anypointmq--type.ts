import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const anypointmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_ANYPOINTMQ_TYPE,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['anypointmqMessageBinding']],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqTypeLint;
