import allowedFieldsLint from './allowed-fields';
import schemaTypeLint from './schema--type';
import examplesValuesTypeLint from './examples--values-type';
import encodingValuesTypeLint from './encoding--values-type';

const lints = [schemaTypeLint, examplesValuesTypeLint, encodingValuesTypeLint, allowedFieldsLint];

export default lints;
