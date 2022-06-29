import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const natsOperationBindingQueueMaxLengthLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_NATS_QUEUE_MAX_LENGTH,
  source: 'apilint',
  message: "'queue' value must not exceed 255 characters",
  severity: 1,
  linterFunction: 'apilintMaxLength',
  linterParams: [255],
  marker: 'value',
  target: 'queue',
  data: {},
};

export default natsOperationBindingQueueMaxLengthLint;
