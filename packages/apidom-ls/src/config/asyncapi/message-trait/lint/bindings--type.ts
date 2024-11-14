import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const bindingsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_BINDINGS_TYPE,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['messageBindings']],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default bindingsTypeLint;
