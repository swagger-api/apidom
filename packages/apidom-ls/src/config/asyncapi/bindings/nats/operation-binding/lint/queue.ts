import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const natsOperationBindingQueueLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_NATS_QUEUE,
  source: 'apilint',
  message: "'queue' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'queue',
  data: {},
};

export default natsOperationBindingQueueLint;
