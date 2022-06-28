import kafkaOperationBindingAllowedFieldsLint from './allowed-fields';
import kafkaOperationBindingGroupIdLint from './group-id';
import kafkaOperationBindingClientIdLint from './client-id';
import kafkaOperationBindingBindingVersionLint from './bindingVersion';

const lints = [
  kafkaOperationBindingAllowedFieldsLint,
  kafkaOperationBindingGroupIdLint,
  kafkaOperationBindingClientIdLint,
  kafkaOperationBindingBindingVersionLint,
];

export default lints;
