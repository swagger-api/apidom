import $refValidLint from './$ref--valid.ts';
import allowedFields3_0__3_1Lint from './allowed-fields-3-0--3-1.ts';
import locationTypeLint from './location--type.ts';
import locationRequiredLint from './location--required.ts';
import descriptionTypeLint from './description--type.ts';

const lints = [
  $refValidLint,
  locationTypeLint,
  locationRequiredLint,
  descriptionTypeLint,
  allowedFields3_0__3_1Lint,
];

export default lints;
