import allowedFields2_0Lint from './allowed-fields-2-0.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import descriptionTypeLint from './description--type.ts';
import descriptionRequiredLint from './description--required.ts';
import headersValuesTypeLint from './headers--values-type.ts';
import headersTypeLint from './headers--type.ts';
import contentValuesTypeLint from './content--values-type.ts';
import linksValuesTypeLint from './links--values-type.ts';
import schemaTypeLint from './schema--type.ts';
import examplesTypeLint from './examples--type.ts';

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
