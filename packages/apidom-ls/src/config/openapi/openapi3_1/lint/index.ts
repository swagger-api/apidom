import allowedFieldsLint from './allowed-fields';
import componentsTypeLint from './components--type';
import externalDocsTypeLint from './external-docs--type';
import infoRequiredLint from './info--required';
import infoTypeLint from './info--type';
import jsonSchemaDialectFormatURILint from './jsonSchemaDialect--format-uri';
import pathsTypeLint from './paths--type';
import securityItemsTypeLint from './security--items-type';
import securityTypeLint from './security--type';
import serversItemsTypeLint from './servers--items-type';
import serversTypeLint from './servers--type';
import tagsItemsTypeLint from './tags--items-type';
import tagsTypeLint from './tags--type';
import webhooksLint from './webhooks--type';

const lints = [
  allowedFieldsLint,
  componentsTypeLint,
  externalDocsTypeLint,
  infoRequiredLint,
  infoTypeLint,
  jsonSchemaDialectFormatURILint,
  pathsTypeLint,
  securityItemsTypeLint,
  securityTypeLint,
  serversItemsTypeLint,
  serversTypeLint,
  tagsItemsTypeLint,
  tagsTypeLint,
  webhooksLint,
];

export default lints;
