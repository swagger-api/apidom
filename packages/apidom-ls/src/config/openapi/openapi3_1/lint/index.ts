import allowedFieldsLint from './allowed-fields';
import infoRequiredLint from './info--required';
import jsonSchemaDialectFormatURILint from './jsonSchemaDialect--format-uri';
import webhooksLint from './webhooks--type';

const lints = [allowedFieldsLint, infoRequiredLint, jsonSchemaDialectFormatURILint, webhooksLint];

export default lints;
