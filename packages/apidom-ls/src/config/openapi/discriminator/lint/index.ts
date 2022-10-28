import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import propertyNameTypeLint from './property-name--type';
import propertyNameRequiredLint from './property-name--required';
import mappingTypeLint from './mapping--type';

const lints = [
  propertyNameTypeLint,
  propertyNameRequiredLint,
  mappingTypeLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
