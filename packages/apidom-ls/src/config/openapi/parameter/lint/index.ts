import allowedFieldsLint from './allowed-fields';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import inTypeLint from './in--type';
import inRequiredLint from './in--required';
import descriptionTypeLint from './description--type';
import requiredTypeLint from './required--type';
import requiredRequiredLint from './required--required';
import requiredEqualsLint from './required--equals';
import deprecatedTypeLint from './deprecated--type';
import allowEmptyValueTypeLint from './allow-empty-value--type';
import styleTypeLint from './style--type';
import explodeTypeLint from './explode--type';
import allowReservedTypeLint from './allow-reserved--type';
import schemaTypeLint from './schema--type';
import examplesValuesTypeLint from './examples--values-type';
import contentValuesTypeLint from './content--values-type';

const lints = [
  allowedFieldsLint,
  $refValidLint,
  $refNoSiblingsLint,
  nameTypeLint,
  nameRequiredLint,
  inTypeLint,
  inRequiredLint,
  descriptionTypeLint,
  requiredTypeLint,
  requiredRequiredLint,
  requiredEqualsLint,
  deprecatedTypeLint,
  allowEmptyValueTypeLint,
  styleTypeLint,
  explodeTypeLint,
  allowReservedTypeLint,
  schemaTypeLint,
  examplesValuesTypeLint,
  contentValuesTypeLint,
];

export default lints;
