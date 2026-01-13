import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

// TODO(vladimir.gorej@gmail.com): this should be moved to linting rules of Parameters Object

const keyExistsInChannelLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_KEY_EXISTS_IN_CHANNEL,
  source: 'apilint',
  message: 'parameter key must be defined in channel name',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelParameterExist',
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default keyExistsInChannelLint;
