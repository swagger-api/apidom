import serverVariableDescriptionLint from './description';
import serverVariableEnumLint from './enum';
import serverVariableExamplesLint from './examples';
import serverVariableAllowedFieldsLint from './allowed-fields';

const serverVariableLints = [
  serverVariableDescriptionLint,
  serverVariableEnumLint,
  serverVariableExamplesLint,
  serverVariableAllowedFieldsLint,
];

export default serverVariableLints;
