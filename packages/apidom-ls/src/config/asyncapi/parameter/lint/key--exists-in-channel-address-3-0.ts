import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const keyExistsInChannelAddress3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_KEY_EXISTS_IN_CHANNEL_ADDRESS,
  source: 'apilint',
  message: 'parameter key must be used in channel address',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelParameterExistsInAddress',
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default keyExistsInChannelAddress3_0Lint;
