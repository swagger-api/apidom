import allowedFieldsLint from './allowed-fields';
import infoTypeLint from './info--type';
import infoRequiredLint from './info--required';
import serversTypeLint from './servers--type';
import serversItemsTypeLint from './servers--items-type';
import pathsTypeLint from './paths--type';
import pathsRequiredLint from './paths--required';
import componentsTypeLint from './components--type';
import securityTypeLint from './security--type';
import securityItemsTypeLint from './security--items-type';
import tagsTypeLint from './tags--type';
import tagsItemsTypeLint from './tags--items-type';
import externalDocsTypeLint from './external-docs--type';

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
