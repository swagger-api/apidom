import allowedFieldsLint from './allowed-fields.ts';
import requiredFieldsLint from './required-fields.ts';
import componentsTypeLint from './components--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';
import infoRequiredLint from './info--required.ts';
import infoTypeLint from './info--type.ts';
import jsonSchemaDialectFormatURILint from './json-schema-dialect--format-uri.ts';
import pathsTypeLint from './paths--type.ts';
import securityItemsTypeLint from './security--items-type.ts';
import securityTypeLint from './security--type.ts';
import serversItemsTypeLint from './servers--items-type.ts';
import serversTypeLint from './servers--type.ts';
import tagsItemsTypeLint from './tags--items-type.ts';
import tagsTypeLint from './tags--type.ts';
import webhooksValuesTypeLint from './webhooks--values--type.ts';

const lints = [
  allowedFieldsLint,
  requiredFieldsLint,
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
  webhooksValuesTypeLint,
];

export default lints;
