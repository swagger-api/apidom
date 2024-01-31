import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: '"parameters" must be of Parameters Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['parameters']],
  marker: 'key',
  target: 'parameters',
  data: {},
};

export default parametersTypeLint;
