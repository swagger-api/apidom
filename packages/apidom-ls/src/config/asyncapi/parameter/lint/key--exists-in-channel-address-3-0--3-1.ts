import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const keyExistsInChannelAddress3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_KEY_EXISTS_IN_CHANNEL_ADDRESS,
  source: 'apilint',
  message: 'parameter key must be defined in channel address',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelParameterExistsInAddress',
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default keyExistsInChannelAddress3_0__3_1Lint;
