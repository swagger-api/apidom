import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
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
import schemaMutuallyExclusiveLint from './schema--mutually-exclusive';
import examplesValuesTypeLint from './examples--values-type';
import examplesMutuallyExclusiveLint from './examples--mutually-exclusive';
import contentValuesTypeLint from './content--values-type';

const lints = [
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
  schemaMutuallyExclusiveLint,
  examplesValuesTypeLint,
  examplesMutuallyExclusiveLint,
  contentValuesTypeLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
