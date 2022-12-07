import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsMessageBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsTypeLint;
