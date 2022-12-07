import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

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
};

export default channelBindingsValuesTypeLint;
