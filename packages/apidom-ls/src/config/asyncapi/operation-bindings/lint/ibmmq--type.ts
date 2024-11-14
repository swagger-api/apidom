import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const imbmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_IBMMQ_TYPE,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['ibmmqOperationBinding']],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default imbmqTypeLint;
