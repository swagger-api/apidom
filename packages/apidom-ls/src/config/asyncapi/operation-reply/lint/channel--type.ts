import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const channelTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_FIELD_CHANNEL_TYPE,
  source: 'apilint',
  message: "'channel' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['channel']],
  marker: 'value',
  target: 'channel',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default channelTypeLint;
