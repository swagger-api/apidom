import allowedFieldsLint from './allowed-fields.ts';
import authorizationCodeLint from './authorization-code--type.ts';
import clientCredentialsLint from './client-credentials--type.ts';
import deviceCodeLint from './device-code--type.ts';

const lints = [allowedFieldsLint, authorizationCodeLint, clientCredentialsLint, deviceCodeLint];

export default lints;
