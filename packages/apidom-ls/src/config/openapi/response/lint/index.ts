import allowedFieldsLint from './allowed-fields';
import descriptionTypeLint from './description--type';
import descriptionRequiredLint from './description--required';
import headersValuesTypeLint from './headers--values-type';
import contentValuesTypeLint from './content--values-type';
import linksValuesTypeLint from './links--values-type';

const lints = [
  descriptionTypeLint,
  descriptionRequiredLint,
  headersValuesTypeLint,
  contentValuesTypeLint,
  linksValuesTypeLint,
  allowedFieldsLint,
];

export default lints;
