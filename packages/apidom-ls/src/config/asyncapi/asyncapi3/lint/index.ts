import allowedFieldsLint from './allowed-fields.ts';
import asyncapiRequiredLint from './asyncapi--required.ts';
import channelsTypeLint from './channels--type.ts';
import componentsTypeLint from './components--type.ts';
import defaultContentTypeTypeLint from './default-content-type--type.ts';
import idFormatURILint from './id--format-uri.ts';
import infoRequiredLint from './info--required.ts';
import infoTypeLint from './info--type.ts';
import serversTypeLint from './servers--type.ts';

const lints = [
  allowedFieldsLint,
  asyncapiRequiredLint,
  idFormatURILint,
  infoRequiredLint,
  infoTypeLint,
  serversTypeLint,
  defaultContentTypeTypeLint,
  channelsTypeLint,
  componentsTypeLint,
];

export default lints;
