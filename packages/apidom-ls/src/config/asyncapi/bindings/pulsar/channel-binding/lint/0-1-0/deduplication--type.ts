import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const deduplicationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_DEDUPLICATION_TYPE,
  source: 'apilint',
  message: "'deduplication' value must be a `boolean`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deduplication',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default deduplicationTypeLint;
