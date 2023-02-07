import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const compactionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_COMPACTION_TYPE,
  source: 'apilint',
  message: "'compaction' value must be an `integer`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true],
  marker: 'value',
  target: 'compaction',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default compactionTypeLint;
