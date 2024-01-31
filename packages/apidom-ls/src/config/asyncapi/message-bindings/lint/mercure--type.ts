import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_MERCURE_TYPE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['mercureMessageBinding']],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureTypeLint;
