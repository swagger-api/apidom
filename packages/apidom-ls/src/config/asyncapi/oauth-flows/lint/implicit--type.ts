import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const implicitTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOWS_FIELD_IMPLICIT_TYPE,
  source: 'apilint',
  message: "'implicit' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'implicit',
  data: {},
};

export default implicitTypeLint;
