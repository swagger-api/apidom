import authorizationUrlFormatURILint from './authorization-url--format-uri.ts';
import authorizationUrlRequiredLint from './authorization-url--required.ts';
import tokenUrlFormatURILint from './token-url--format-uri.ts';
import tokenUrlRequiredLint from './token-url--required.ts';
import refreshUrlFormatURILint from './refresh-url--format-uri.ts';
import scopesTypeLint from './scopes--type.ts';
import scopesRequiredLint from './scopes--required.ts';
import allowedFields2_0__2_6Lint from './allowed-fields-2-0--2-6.ts';

const lints = [
  authorizationUrlFormatURILint,
  authorizationUrlRequiredLint,
  tokenUrlFormatURILint,
  tokenUrlRequiredLint,
  refreshUrlFormatURILint,
  scopesTypeLint,
  scopesRequiredLint,
  allowedFields2_0__2_6Lint,
];

export default lints;
