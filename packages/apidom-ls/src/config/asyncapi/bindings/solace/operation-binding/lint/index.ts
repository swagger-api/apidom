import solaceOperationBindingAllowedFieldsLint from './allowed-fields';
import solaceServerBindingDestinationsLint from './destinations';
import solaceOperationBindingBindingVersionLint from './bindingVersion';

const lints = [
  solaceOperationBindingAllowedFieldsLint,
  solaceServerBindingDestinationsLint,
  solaceOperationBindingBindingVersionLint,
];

export default lints;
