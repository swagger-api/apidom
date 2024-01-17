import allowedFieldsLint from './allowed-fields';
import schemaTypeLint from './schema--type';
import schemaTypeOpenAPI3_1Lint from './schema--type-openapi-3-1';
import examplesValuesTypeLint from './examples--values-type';
import encodingValuesTypeLint from './encoding--values-type';
import examplesMutuallyExclusiveLint from './examples--mutually-exclusive';

const lints = [
  schemaTypeLint,
  schemaTypeOpenAPI3_1Lint,
  examplesValuesTypeLint,
  encodingValuesTypeLint,
  allowedFieldsLint,
  examplesMutuallyExclusiveLint,
];

export default lints;
