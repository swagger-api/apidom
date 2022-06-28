import kafkaMessageBindingAllowedFieldsLint from './allowed-fields';
import bindingVersionLint from './bindingVersion';
import keyObjectLint from './key-object';

const lints = [kafkaMessageBindingAllowedFieldsLint, bindingVersionLint, keyObjectLint];

export default lints;
