import channelParameterExistLint from './parameter-key-exist';
import parameterSchema from './schema';
import parameterDescriptionLint from './description';
import parameterLocationLint from './location';
import parameterRefNonSiblingsLint from './ref-non-siblings';
import parameter$RefLint from './ref';
import parameterAllowedFieldsLint from './allowed-fields';

const lints = [
  channelParameterExistLint,
  parameterSchema,
  parameterDescriptionLint,
  parameterLocationLint,
  parameter$RefLint,
  parameterRefNonSiblingsLint,
  parameterAllowedFieldsLint,
];

export default lints;
