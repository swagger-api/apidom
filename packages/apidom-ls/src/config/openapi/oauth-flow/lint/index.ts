import authorizationUrlFormatURILint from './authorization-url--format-uri.ts';
import tokenUrlFormatURILint from './token-url--format-uri.ts';
import refreshUrlFormatURILint from './refresh-url--format-uri.ts';
import scopesTypeLint from './scopes--type.ts';
import allowedFieldsLint from './allowed-fields.ts';

const lints = [
  authorizationUrlFormatURILint,
  tokenUrlFormatURILint,
  refreshUrlFormatURILint,
  scopesTypeLint,
  allowedFieldsLint,
];

export default lints;
