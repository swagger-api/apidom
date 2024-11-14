import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a IBM MQ Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['googlepubsubServerBinding']],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
};

export default googlepubsubTypeLint;
