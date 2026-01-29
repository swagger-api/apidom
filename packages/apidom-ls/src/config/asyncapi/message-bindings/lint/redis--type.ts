import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const redisTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_REDIS_TYPE,
  source: 'apilint',
  message: '"redis" must be a Redis Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['redisMessageBinding']],
  marker: 'value',
  target: 'redis',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default redisTypeLint;
