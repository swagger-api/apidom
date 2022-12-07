import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const isEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_CHANNEL_BINDING_FIELD_IS_EQUALS,
  source: 'apilint',
  message: "'is' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['queue', 'routingKey']],
  marker: 'value',
  target: 'is',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default isEqualsLint;
