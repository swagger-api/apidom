import allowedFieldsLint from './allowed-fields';
import infoRequiredLint from './info--required';
import jsonSchemaDialectTypeLint from './jsonSchemaDialect--type';
import webhooksLint from './webhooks--type';

const lints = [allowedFieldsLint, infoRequiredLint, jsonSchemaDialectTypeLint, webhooksLint];

export default lints;
