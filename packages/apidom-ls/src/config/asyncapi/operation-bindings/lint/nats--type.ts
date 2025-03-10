import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['natsOperationBinding']],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsTypeLint;
