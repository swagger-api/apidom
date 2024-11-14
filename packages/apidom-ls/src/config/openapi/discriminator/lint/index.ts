import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import propertyNameTypeLint from './property-name--type.ts';
import propertyNameRequiredLint from './property-name--required.ts';
import mappingTypeLint from './mapping--type.ts';

const lints = [
  propertyNameTypeLint,
  propertyNameRequiredLint,
  mappingTypeLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
