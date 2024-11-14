import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const redisTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_REDIS_TYPE,
  source: 'apilint',
  message: '"redis" must be a Redis Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['redisServerBinding']],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisTypeLint;
