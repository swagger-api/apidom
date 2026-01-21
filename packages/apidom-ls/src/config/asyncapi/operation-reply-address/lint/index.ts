import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import locationTypeLint from './location--type.ts';
import locationRequiredLint from './location--required.ts';
import descriptionTypeLint from './description--type.ts';

const lints = [
  locationTypeLint,
  locationRequiredLint,
  descriptionTypeLint,
  allowedFields3_0Lint,
];

export default lints;
