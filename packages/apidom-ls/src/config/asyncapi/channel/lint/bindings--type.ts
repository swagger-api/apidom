import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const bindingsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_BINDINGS_TYPE,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['channelBindings']],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default bindingsTypeLint;
