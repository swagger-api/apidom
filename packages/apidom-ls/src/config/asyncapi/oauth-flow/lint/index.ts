import authorizationUrlFormatURILint from './authorization-url--format-uri.ts';
import authorizationUrlRequiredLint from './authorization-url--required.ts';
import tokenUrlFormatURILint from './token-url--format-uri.ts';
import tokenUrlRequiredLint from './token-url--required.ts';
import refreshUrlFormatURILint from './refresh-url--format-uri.ts';
import scopesTypeLint from './scopes--type.ts';
import scopesRequiredLint from './scopes--required.ts';
import allowedFieldsLint from './allowed-fields.ts';

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
