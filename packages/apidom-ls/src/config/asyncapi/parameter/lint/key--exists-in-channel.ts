import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// TODO(vladimir.gorej@gmail.com): this should be moved to linting rules of Parameters Object

const keyExistsInChannelLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_KEY_EXISTS_IN_CHANNEL,
  source: 'apilint',
  message: 'parameter key must be defined in channel name',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelParameterExist',
  marker: 'key',
  data: {},
};

export default keyExistsInChannelLint;
