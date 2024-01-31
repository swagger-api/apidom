import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_HTTP_TYPE,
  source: 'apilint',
  message: '"http" must be a HTTP Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['httpServerBinding']],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpTypeLint;
