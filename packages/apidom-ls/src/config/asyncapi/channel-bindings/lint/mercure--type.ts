import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_MERCURE_TYPE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureChannelBinding'],
  marker: 'value',
  target: 'mercure',
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

export default mercureTypeLint;
