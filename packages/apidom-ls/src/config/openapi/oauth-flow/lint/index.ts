import authorizationUrlFormatURILint from './authorization-url--format-uri.ts';
import tokenUrlFormatURILint from './token-url--format-uri.ts';
import refreshUrlFormatURILint from './refresh-url--format-uri.ts';
import deviceAuthorizationUrlFormatURILint from './device-authorization-url--format-uri.ts';
import scopesTypeLint from './scopes--type.ts';
import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';

const lints = [
  authorizationUrlFormatURILint,
  tokenUrlFormatURILint,
  refreshUrlFormatURILint,
  deviceAuthorizationUrlFormatURILint,
  scopesTypeLint,
  allowedFieldsLint,
  allowedFields3_2Lint,
];

export default lints;
