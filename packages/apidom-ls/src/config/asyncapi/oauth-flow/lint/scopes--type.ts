import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const scopesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_SCOPES_TYPE,
  source: 'apilint',
  message: "'scopes' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oauth-flow-scopes']],
  marker: 'value',
  target: 'scopes',
  data: {},
};

export default scopesTypeLint;
