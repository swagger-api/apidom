import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_SOLACE_TYPE,
  source: 'apilint',
  message: '"solace" must be a Solace Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceMessageBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceTypeLint;
