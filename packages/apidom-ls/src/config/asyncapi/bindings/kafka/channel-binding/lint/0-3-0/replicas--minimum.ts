import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const replicasMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_CHANNEL_BINDING_FIELD_REPLICAS_MINIMUM,
  source: 'apilint',
  message: "'replicas' value must be positive integer",
  severity: 1,
  linterFunction: 'apilintMinimum',
  linterParams: [1],
  marker: 'value',
  target: 'replicas',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default replicasMinimumLint;
