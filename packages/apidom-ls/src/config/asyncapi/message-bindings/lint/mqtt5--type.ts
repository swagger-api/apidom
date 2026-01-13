import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const mqtt5TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_MQTT5_TYPE,
  source: 'apilint',
  message: '"mqtt5" must be a MQTT 5 Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['mqtt5MessageBinding']],
  marker: 'value',
  target: 'mqtt5',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default mqtt5TypeLint;
