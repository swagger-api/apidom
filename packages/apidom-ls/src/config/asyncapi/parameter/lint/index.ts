import descriptionTypeLint from './description--type';
import schemaTypeLint from './schema--type';
import locationTypeLint from './location--type';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';
import keyExistsInChannelLint from './key--exists-in-channel';
import allowedFieldsLint from './allowed-fields';

const lints = [
  keyExistsInChannelLint,
  descriptionTypeLint,
  schemaTypeLint,
  locationTypeLint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFieldsLint,
];

export default lints;
