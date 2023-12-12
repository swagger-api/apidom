import allowedFieldsLint from './allowed-fields';
import infoTypeLint from './info--type';
import infoRequiredLint from './info--required';
import hostPatternLint from './host--pattern';
import basePathPatternLint from './base-path--pattern';
import schemesTypeLint from './schemes--type';
import schemesEqualsLint from './schemes--equals';
import consumesTypeLint from './consumes--type';
import producesTypeLint from './produces--type';
import pathsTypeLint from './paths--type';
import pathsRequiredLint from './paths--required';
import definitionsTypeLint from './definitions--type';
import parametersTypeLint from './parameters--type';
import responsesTypeLint from './responses--type';
import securityDefinitionsTypeLint from './security-definitions--type';
import securityTypeLint from './security--type';
import tagsTypeLint from './tags--type';
import externalDocsTypeLint from './external-docs--type';

const lints = [
  allowedFieldsLint,
  infoTypeLint,
  infoRequiredLint,
  hostPatternLint,
  basePathPatternLint,
  schemesTypeLint,
  schemesEqualsLint,
  consumesTypeLint,
  producesTypeLint,
  pathsTypeLint,
  pathsRequiredLint,
  definitionsTypeLint,
  parametersTypeLint,
  responsesTypeLint,
  securityDefinitionsTypeLint,
  securityTypeLint,
  tagsTypeLint,
  externalDocsTypeLint,
];

export default lints;
