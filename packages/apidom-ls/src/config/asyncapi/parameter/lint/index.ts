import descriptionTypeLint from './description--type.ts';
import schemaTypeLint from './schema--type.ts';
import locationTypeLint from './location--type.ts';
import $refValidLint from './$ref--valid.ts';
import keyExistsInChannel2_0__2_6Lint from './key--exists-in-channel-2-0--2-6.ts';
import keyExistsInChannelAddress3_0Lint from './key--exists-in-channel-address-3-0.ts';
import allowedFields2_0__2_6Lint from './allowed-fields-2-0--2-6.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import enumTypeLint from './enum--type.ts';
import defaultTypeLint from './default--type.ts';
import examplesTypeLint from './examples--type.ts';

const lints = [
  keyExistsInChannel2_0__2_6Lint,
  keyExistsInChannelAddress3_0Lint,
  descriptionTypeLint,
  schemaTypeLint,
  locationTypeLint,
  $refValidLint,
  allowedFields2_0__2_6Lint,
  allowedFields3_0Lint,
  enumTypeLint,
  defaultTypeLint,
  examplesTypeLint,
];

export default lints;
