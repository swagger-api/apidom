import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';
import schemaTypeLint from './schema--type.ts';
import schemaTypeOpenAPI3_1__3_2Lint from './schema--type-openapi-3-1--3-2.ts';
import itemSchemaTypeLint from './item-schema--type.ts';
import prefixEncodingTypeLint from './prefix-encoding--type.ts';
import itemEncodingTypeLint from './item-encoding--type.ts';
import examplesValuesTypeLint from './examples--values-type.ts';
import encodingValuesTypeLint from './encoding--values-type.ts';
import examplesMutuallyExclusiveLint from './examples--mutually-exclusive.ts';

const lints = [
  schemaTypeLint,
  schemaTypeOpenAPI3_1__3_2Lint,
  itemSchemaTypeLint,
  prefixEncodingTypeLint,
  itemEncodingTypeLint,
  examplesValuesTypeLint,
  encodingValuesTypeLint,
  allowedFieldsLint,
  allowedFields3_2Lint,
  examplesMutuallyExclusiveLint,
];

export default lints;
