import correlationIDDescriptionLint from './description';
import correlationIDLocationLint from './location';
import correlationIDLocationRequiredLint from './location-required';
import correlationIDRefLint from './ref';
import correlationIDRefNonSiblingsLint from './ref-non-siblings';
import correlationIDAllowedFieldsLint from './allowed-fields';

const lints = [
  correlationIDDescriptionLint,
  correlationIDLocationLint,
  correlationIDLocationRequiredLint,
  correlationIDRefLint,
  correlationIDRefNonSiblingsLint,
  correlationIDAllowedFieldsLint,
];

export default lints;
