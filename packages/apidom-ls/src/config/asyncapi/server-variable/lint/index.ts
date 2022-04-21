import serverVariableDescriptionLint from './description';
import serverVariableEnumLint from './enum';
import serverVariableExamplesLint from './examples';
import serverVariableAllowedFieldsLint from './allowed-fields';

const lints = [
  serverVariableDescriptionLint,
  serverVariableEnumLint,
  serverVariableExamplesLint,
  serverVariableAllowedFieldsLint,
];

export default lints;
