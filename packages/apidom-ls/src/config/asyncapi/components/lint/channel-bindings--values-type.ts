import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const channelBindingsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_CHANNEL_BINDINGS_VALUES_TYPE,
  source: 'apilint',
  message: '"channelBindings" values must be of Channel Bindings Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channelBindings']],
  marker: 'key',
  markerTarget: 'channelBindings',
  target: 'channelBindings',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default channelBindingsValuesTypeLint;
