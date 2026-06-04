import allowedFieldsLint from './allowed-fields.ts';
import authorizationUrlRequiredLint from './authorization-url--required.ts';
import authorizationUrlLint from './authorization-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [
  allowedFieldsLint,
  authorizationUrlRequiredLint,
  authorizationUrlLint,
  refreshUrlLint,
  scopesLint,
];

export default lints;
