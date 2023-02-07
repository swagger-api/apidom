import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ibmmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_IBMMQ_TYPE,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqChannelBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
  ],
};

export default ibmmqTypeLint;
