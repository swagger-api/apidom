import authorizationUrlFormatURILint from './authorization-url--format-uri';
import tokenUrlFormatURILint from './token-url--format-uri';
import refreshUrlFormatURILint from './refresh-url--format-uri';
import scopesTypeLint from './scopes--type';
import allowedFieldsLint from './allowed-fields';

const lints = [
  authorizationUrlFormatURILint,
  tokenUrlFormatURILint,
  refreshUrlFormatURILint,
  scopesTypeLint,
  allowedFieldsLint,
];

export default lints;
