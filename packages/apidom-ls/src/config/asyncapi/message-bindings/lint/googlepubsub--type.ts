import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a GooglePubSub Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['googlepubsubMessageBinding']],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
};

export default googlepubsubTypeLint;
