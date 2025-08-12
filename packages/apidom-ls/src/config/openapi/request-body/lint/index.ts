import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import descriptionTypeLint from './description--type.ts';
import contentValuesTypeLint from './content--values-type.ts';
import contentRequiredLint from './content--required.ts';
import requiredTypeLint from './required--type.ts';
import $ref3RequestBodiesNamingLint from './$ref-3-0--request-bodies-naming.ts';
import $ref3RequestBodiesNamingSchemaLint from './$ref-3-0--request-bodies-naming-schema.ts';

const lints = [
  $ref3RequestBodiesNamingLint,
  $ref3RequestBodiesNamingSchemaLint,
  descriptionTypeLint,
  contentRequiredLint,
  contentValuesTypeLint,
  requiredTypeLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
