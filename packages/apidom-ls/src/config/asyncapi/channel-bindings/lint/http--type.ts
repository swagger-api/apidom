import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const httpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_HTTP_TYPE,
  source: 'apilint',
  message: '"http" must be a HTTP Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['httpChannelBinding']],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpTypeLint;
