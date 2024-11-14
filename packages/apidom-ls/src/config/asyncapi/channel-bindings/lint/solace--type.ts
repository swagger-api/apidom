import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const solaceTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_SOLACE_TYPE,
  source: 'apilint',
  message: '"solace" must be a Solace Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['solaceChannelBinding']],
  marker: 'value',
  target: 'solace',
  data: {},
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
  ],
};

export default solaceTypeLint;
