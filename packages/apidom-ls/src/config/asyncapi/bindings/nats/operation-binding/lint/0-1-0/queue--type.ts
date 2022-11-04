import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const queueTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_NATS_OPERATION_BINDING_FIELD_QUEUE_TYPE,
  source: 'apilint',
  message: "'queue' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'queue',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default queueTypeLint;
