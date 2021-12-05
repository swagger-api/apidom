import serverVariableDescriptionLint from './description';
import serverVariableEnumLint from './enum';
import serverVariableExamplesLint from './examples';

const serverVariableLints = [
  serverVariableDescriptionLint,
  serverVariableEnumLint,
  serverVariableExamplesLint,
];

export default serverVariableLints;
