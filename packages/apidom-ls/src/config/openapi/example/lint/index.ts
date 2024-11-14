import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import summaryTypeLint from './summary--type.ts';
import descriptionTypeLint from './description--type.ts';
import valueMutuallyExclusiveLint from './value--mutually-exclusive.ts';
import externalValueFormatURILint from './external-value--format-uri.ts';

const lints = [
  summaryTypeLint,
  descriptionTypeLint,
  valueMutuallyExclusiveLint,
  externalValueFormatURILint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
