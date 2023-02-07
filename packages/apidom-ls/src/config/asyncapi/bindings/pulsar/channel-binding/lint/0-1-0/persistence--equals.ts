import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const persistenceEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_PERSISTENCE_EQUALS,
  source: 'apilint',
  message: "'destinationType' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['persistent', 'non-persistent']],
  marker: 'value',
  target: 'persistence',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default persistenceEqualsLint;
