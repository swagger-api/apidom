import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_CHANNELS_VALUES_TYPE,
  source: 'apilint',
  message: '"channels" values must be of Channel Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channelItem']],
  marker: 'key',
  markerTarget: 'channels',
  target: 'channels',
  data: {},
};

export default channelsValuesTypeLint;
