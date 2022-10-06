import allowedFieldsLint from './allowed-fields';
import componentsTypeLint from './components--type';
import componentsRequiredLint from './components--required';
import externalDocsTypeLint from './external-docs--type';
import infoRequiredLint from './info--required';
import infoTypeLint from './info--type';
import jsonSchemaDialectFormatURILint from './jsonSchemaDialect--format-uri';
import pathsTypeLint from './paths--type';
import pathsRequiredLint from './paths--required';
import securityItemsTypeLint from './security--items-type';
import securityTypeLint from './security--type';
import serversItemsTypeLint from './servers--items-type';
import serversTypeLint from './servers--type';
import tagsItemsTypeLint from './tags--items-type';
import tagsTypeLint from './tags--type';
import webhooksLint from './webhooks--type';
import webhooksRequiredLint from './webhooks--required';

const lints = [
  allowedFieldsLint,
  componentsTypeLint,
  componentsRequiredLint,
  externalDocsTypeLint,
  infoRequiredLint,
  infoTypeLint,
  jsonSchemaDialectFormatURILint,
  pathsTypeLint,
  pathsRequiredLint,
  securityItemsTypeLint,
  securityTypeLint,
  serversItemsTypeLint,
  serversTypeLint,
  tagsItemsTypeLint,
  tagsTypeLint,
  webhooksLint,
  webhooksRequiredLint,
];

export default lints;
