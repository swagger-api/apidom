import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['natsServerBinding']],
  marker: 'value',
  target: 'nats',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default natsTypeLint;
