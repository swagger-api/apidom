import descriptionTypeLint from './description--type.ts';
import schemaTypeLint from './schema--type.ts';
import locationTypeLint from './location--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';
import keyExistsInChannelLint from './key--exists-in-channel.ts';
import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';

const lints = [
  keyExistsInChannelLint,
  descriptionTypeLint,
  schemaTypeLint,
  locationTypeLint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFieldsLint,
  allowedFields3_0Lint,
];

export default lints;
