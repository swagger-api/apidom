import allowedFieldsLint from './allowed-fields';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import valueMutuallyExclusiveLint from './value--mutually-exclusive';
import externalValueFormatURILint from './external-value--format-uri';

const lints = [
  summaryTypeLint,
  descriptionTypeLint,
  valueMutuallyExclusiveLint,
  externalValueFormatURILint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFieldsLint,
];

export default lints;
