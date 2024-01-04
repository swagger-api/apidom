import allowedFields2_0Lint from './allowed-fields-2-0';
import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import descriptionTypeLint from './description--type';
import descriptionRequiredLint from './description--required';
import headersValuesTypeLint from './headers--values-type';
import headersTypeLint from './headers--type';
import contentValuesTypeLint from './content--values-type';
import linksValuesTypeLint from './links--values-type';
import schemaTypeLint from './schema--type';
import examplesTypeLint from './examples--type';

const lints = [
  descriptionTypeLint,
  descriptionRequiredLint,
  headersTypeLint,
  headersValuesTypeLint,
  contentValuesTypeLint,
  linksValuesTypeLint,
  schemaTypeLint,
  examplesTypeLint,
  allowedFields2_0Lint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
