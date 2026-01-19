import allowedFieldsLint from './allowed-fields.ts';
import descriptionTypeLint from './description--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

const lints = [
  descriptionTypeLint,
  parametersTypeLint,
  bindingsTypeLint,
  allowedFieldsLint,
  $refValidLint,
  $refNoSiblingsLint,
];

export default lints;
