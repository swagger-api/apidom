import allowedFieldsLint from './allowed-fields.ts';
import infoTypeLint from './info--type.ts';
import infoRequiredLint from './info--required.ts';
import serversTypeLint from './servers--type.ts';
import serversItemsTypeLint from './servers--items-type.ts';
import pathsTypeLint from './paths--type.ts';
import pathsRequiredLint from './paths--required.ts';
import componentsTypeLint from './components--type.ts';
import securityTypeLint from './security--type.ts';
import securityItemsTypeLint from './security--items-type.ts';
import tagsTypeLint from './tags--type.ts';
import tagsItemsTypeLint from './tags--items-type.ts';
import externalDocsTypeLint from './external-docs--type.ts';

const lints = [
  allowedFieldsLint,
  infoTypeLint,
  infoRequiredLint,
  serversTypeLint,
  serversItemsTypeLint,
  pathsTypeLint,
  pathsRequiredLint,
  componentsTypeLint,
  securityTypeLint,
  securityItemsTypeLint,
  tagsTypeLint,
  tagsItemsTypeLint,
  externalDocsTypeLint,
];

export default lints;
