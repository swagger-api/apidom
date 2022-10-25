import allowedFields3_0Lint from './allowed-fields-3-0';
import descriptionTypeLint from './description--type';
import contentValuesTypeLint from './content--values-type';
import contentRequiredLint from './content--required';
import requiredTypeLint from './required--type';

const lints = [
  descriptionTypeLint,
  contentRequiredLint,
  contentValuesTypeLint,
  requiredTypeLint,
  allowedFields3_0Lint,
];

export default lints;
