import allowedFieldsLint from './allowed-fields';
import schemaTypeLint from './schema--type';
import examplesValuesTypeLint from './examples--values-type';
import encodingValuesTypeLint from './encoding--values-type';
import examplesMutuallyExclusiveLint from './examples--mutually-exclusive';

const lints = [
  schemaTypeLint,
  examplesValuesTypeLint,
  encodingValuesTypeLint,
  allowedFieldsLint,
  examplesMutuallyExclusiveLint,
];

export default lints;
