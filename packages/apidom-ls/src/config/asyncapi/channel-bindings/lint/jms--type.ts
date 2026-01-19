import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const jmsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_JMS_TYPE,
  source: 'apilint',
  message: '"jms" must be a JMS Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['httpChannelBinding']],
  marker: 'value',
  target: 'jms',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default jmsTypeLint;
