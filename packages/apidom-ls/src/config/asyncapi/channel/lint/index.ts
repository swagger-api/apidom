import allowedFieldsLint from './allowed-fields.ts';
import descriptionTypeLint from './description--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';

const lints = [descriptionTypeLint, parametersTypeLint, bindingsTypeLint, allowedFieldsLint];

export default lints;
