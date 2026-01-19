import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const pulsarTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_PULSAR_TYPE,
  source: 'apilint',
  message: '"pulsar" must be a Pulsar Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['pulsarMessageBinding']],
  marker: 'value',
  target: 'pulsar',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default pulsarTypeLint;
