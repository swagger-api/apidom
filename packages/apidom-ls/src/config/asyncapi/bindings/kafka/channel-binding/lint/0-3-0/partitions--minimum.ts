import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const partitionsMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_CHANNEL_BINDING_FIELD_PARTITIONS_MINIMUM,
  source: 'apilint',
  message: "'partitions' value must be positive integer",
  severity: 1,
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
