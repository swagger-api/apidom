import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const valuesType2_0__2_6Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNELS_VALUES_TYPE,
  source: 'apilint',
  message: 'Channels Object values must be of Channel Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channelItem']],
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default valuesType2_0__2_6Lint;
