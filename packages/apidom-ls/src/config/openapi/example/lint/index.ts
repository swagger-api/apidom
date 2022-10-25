import allowedFields3_0Lint from './allowed-fields-3-0';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import valueMutuallyExclusiveLint from './value--mutually-exclusive';
import externalValueFormatURILint from './external-value--format-uri';

const lints = [
  summaryTypeLint,
  descriptionTypeLint,
  valueMutuallyExclusiveLint,
  externalValueFormatURILint,
  allowedFields3_0Lint,
];

export default lints;
