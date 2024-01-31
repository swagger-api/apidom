import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_SNS_TYPE,
  source: 'apilint',
  message: '"sns" must be a SNS Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['snsOperationBinding']],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsTypeLint;
