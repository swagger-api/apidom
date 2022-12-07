import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_SNS_TYPE,
  source: 'apilint',
  message: '"sns" must be a SNS Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsMessageBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsTypeLint;
