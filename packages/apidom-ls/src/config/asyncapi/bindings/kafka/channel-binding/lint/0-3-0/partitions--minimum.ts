import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const partitionsMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_CHANNEL_BINDING_FIELD_PARTITIONS_MINIMUM,
  source: 'apilint',
  message: "'partitions' value must be positive integer",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintMinimum',
  linterParams: [1],
  marker: 'value',
  target: 'partitions',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default partitionsMinimumLint;
