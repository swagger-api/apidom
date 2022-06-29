import natsOperationBindingAllowedFieldsLint from './allowed-fields';
import natsOperationBindingQueueLint from './queue';
import natsOperationBindingQueueMaxLengthLint from './queue-max-length';
import natsOperationBindingBindingVersionLint from './bindingVersion';

const lints = [
  natsOperationBindingAllowedFieldsLint,
  natsOperationBindingQueueLint,
  natsOperationBindingQueueMaxLengthLint,
  natsOperationBindingBindingVersionLint,
];

export default lints;
