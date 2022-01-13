import kafkaMessageBindingAllowedFieldsLint from './allowed-fields';
import bindingVersionLint from './bindingVersion';
import keyObjectLint from './key-object';

const kafkaMessageBindingLints = [
  kafkaMessageBindingAllowedFieldsLint,
  bindingVersionLint,
  keyObjectLint,
];

export default kafkaMessageBindingLints;
