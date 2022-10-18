import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import identifierMutuallyExclusiveLint from './identifier--mutually-exclusive';
import urlFormatURILint from './url--format-uri';

const lints = [
  nameTypeLint,
  nameRequiredLint,
  identifierMutuallyExclusiveLint,
  urlFormatURILint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
