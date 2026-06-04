import allowedFieldsLint from './allowed-fields.ts';
import tokenUrlRequiredLint from './token-url--required.ts';
import tokenUrlLint from './token-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [allowedFieldsLint, tokenUrlRequiredLint, tokenUrlLint, refreshUrlLint, scopesLint];

export default lints;
