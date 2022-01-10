import channelParameterExistLint from './parameter-key-exist';
import parameterSchema from './schema';
import parameterDescriptionLint from './description';
import parameterLocationLint from './location';
import parameterRefNonSiblingsLint from './ref-non-siblings';
import parameter$RefLint from './ref';

const parameterLints = [
  channelParameterExistLint,
  parameterSchema,
  parameterDescriptionLint,
  parameterLocationLint,
  parameter$RefLint,
  parameterRefNonSiblingsLint,
];

export default parameterLints;
