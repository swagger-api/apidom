import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNELS_VALUES_TYPE,
  source: 'apilint',
  message: 'Channels Object values must be of Channel Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channelItem']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
