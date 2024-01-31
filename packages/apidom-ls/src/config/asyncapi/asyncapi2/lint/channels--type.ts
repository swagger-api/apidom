import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_CHANNELS_TYPE,
  source: 'apilint',
  message: 'channels must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['channels']],
  marker: 'value',
  target: 'channels',
  data: {},
};

export default channelsTypeLint;
