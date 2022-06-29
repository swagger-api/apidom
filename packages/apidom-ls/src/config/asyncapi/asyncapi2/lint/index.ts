import allowedFieldsLint from './allowed-fields';
import asyncapiRequiredLint from './asyncapi--required';
import channelsRequiredLint from './channels--required';
import channelsTypeLint from './channels--type';
import componentsTypeLint from './components--type';
import defaultContentTypeTypeLint from './default-content-type--type';
import externalDocsTypeLint from './external-docs--type';
import idFormatURILint from './id--format-uri';
import infoRequiredLint from './info--required';
import infoTypeLint from './info--type';
import serversTypeLint from './servers--type';
import tagsTypeLint from './tags--type';

const lints = [
  allowedFieldsLint,
  asyncapiRequiredLint,
  idFormatURILint,
  infoRequiredLint,
  infoTypeLint,
  serversTypeLint,
  defaultContentTypeTypeLint,
  channelsRequiredLint,
  channelsTypeLint,
  componentsTypeLint,
  tagsTypeLint,
  externalDocsTypeLint,
];

export default lints;
