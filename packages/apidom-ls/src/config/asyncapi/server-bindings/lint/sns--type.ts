import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const snsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_SNS_TYPE,
  source: 'apilint',
  message: '"sns" must be a SNS Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['snsServerBinding']],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsTypeLint;
