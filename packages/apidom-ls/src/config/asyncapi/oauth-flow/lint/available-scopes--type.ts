import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const availableScopesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OAUTH_FLOW_FIELD_AVAILABLE_SCOPES_TYPE,
  source: 'apilint',
  message: "'availableScopes' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oauth-flow-scopes']],
  marker: 'value',
  target: 'availableScopes',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default availableScopesTypeLint;
