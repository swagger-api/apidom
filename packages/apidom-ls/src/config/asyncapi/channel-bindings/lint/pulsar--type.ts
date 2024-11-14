import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const pulsarTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_PUSLAR_TYPE,
  source: 'apilint',
  message: '"pulsar" must be a Pulsar Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['pulsarChannelBinding']],
  marker: 'value',
  target: 'pulsar',
  data: {},
  targetSpecs: [{ namespace: 'asyncapi', version: '2.6.0' }],
};

export default pulsarTypeLint;
