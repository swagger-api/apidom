import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const pulsarTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_PULSAR_TYPE,
  source: 'apilint',
  message: '"pulsar" must be a Pulsar Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['pulsarServerBinding']],
  marker: 'value',
  target: 'pulsar',
  data: {},
};

export default pulsarTypeLint;
