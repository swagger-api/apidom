import descriptionTypeLint from './description--type.ts';
import schemaTypeLint from './schema--type.ts';
import locationTypeLint from './location--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';
import keyExistsInChannelLint from './key--exists-in-channel.ts';
import allowedFieldsLint from './allowed-fields.ts';

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
