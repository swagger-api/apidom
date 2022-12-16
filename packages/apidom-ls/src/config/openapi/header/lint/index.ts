import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import descriptionTypeLint from './description--type';
import requiredTypeLint from './required--type';
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
  descriptionTypeLint,
  requiredTypeLint,
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
