import allowedFieldsLint from './allowed-fields.ts';
import schemaTypeLint from './schema--type.ts';
import schemaTypeOpenAPI3_1Lint from './schema--type-openapi-3-1.ts';
import examplesValuesTypeLint from './examples--values-type.ts';
import encodingValuesTypeLint from './encoding--values-type.ts';
import examplesMutuallyExclusiveLint from './examples--mutually-exclusive.ts';

const lints = [
  schemaTypeLint,
  schemaTypeOpenAPI3_1Lint,
  examplesValuesTypeLint,
  encodingValuesTypeLint,
  allowedFieldsLint,
  examplesMutuallyExclusiveLint,
];

export default lints;
