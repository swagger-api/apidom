import correlationIDDescriptionLint from './description';
import correlationIDLocationLint from './location';
import correlationIDLocationRequiredLint from './location-required';
import correlationIDRefLint from './ref';
import correlationIDRefNonSiblingsLint from './ref-non-siblings';

const lints = [
  correlationIDDescriptionLint,
  correlationIDLocationLint,
  correlationIDLocationRequiredLint,
  correlationIDRefLint,
  correlationIDRefNonSiblingsLint,
];

export default lints;
