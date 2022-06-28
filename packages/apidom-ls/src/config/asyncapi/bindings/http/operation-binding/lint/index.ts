import httpOperationBindingAllowedFieldsLint from './allowed-fields';
import httpOperationBindingTypeLint from './type';
import httpOperationBindingTypeRequiredLint from './type-required';
import httpOperationBindingMethodLint from './method';
import httpOperationBindingQueryLint from './query';
import httpOperationBindingBindingVersionLint from './bindingVersion';

const lints = [
  httpOperationBindingAllowedFieldsLint,
  httpOperationBindingTypeLint,
  httpOperationBindingTypeRequiredLint,
  httpOperationBindingMethodLint,
  httpOperationBindingQueryLint,
  httpOperationBindingBindingVersionLint,
];

export default lints;
