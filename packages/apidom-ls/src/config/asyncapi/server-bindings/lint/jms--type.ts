import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const jmsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_JMS_TYPE,
  source: 'apilint',
  message: '"jms" must be a JMS Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['httpServerBinding']],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsTypeLint;
