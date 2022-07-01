import authorizationUrlFormatURILint from './authorization-url--format-uri';
import authorizationUrlRequiredLint from './authorization-url--required';
import tokenUrlFormatURILint from './token-url--format-uri';
import tokenUrlRequiredLint from './token-url--required';
import refreshUrlFormatURILint from './refresh-url--format-uri';
import scopesTypeLint from './scopes--type';
import scopesRequiredLint from './scopes--required';
import allowedFieldsLint from './allowed-fields';

const lints = [
  authorizationUrlFormatURILint,
  authorizationUrlRequiredLint,
  tokenUrlFormatURILint,
  tokenUrlRequiredLint,
  refreshUrlFormatURILint,
  scopesTypeLint,
  scopesRequiredLint,
  allowedFieldsLint,
];

export default lints;
