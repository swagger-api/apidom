import allowedFieldsLint from './allowed-fields.ts';
import authorizationUrlLint from './authorization-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [allowedFieldsLint, authorizationUrlLint, refreshUrlLint, scopesLint];

export default lints;
