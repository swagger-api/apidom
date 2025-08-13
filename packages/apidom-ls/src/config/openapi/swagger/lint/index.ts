import allowedFieldsLint from './allowed-fields.ts';
import infoTypeLint from './info--type.ts';
import infoRequiredLint from './info--required.ts';
import hostPatternLint from './host--pattern.ts';
import basePathPatternLint from './base-path--pattern.ts';
import schemesTypeLint from './schemes--type.ts';
import schemesEqualsLint from './schemes--equals.ts';
import consumesTypeLint from './consumes--type.ts';
import producesTypeLint from './produces--type.ts';
import pathsTypeLint from './paths--type.ts';
import pathsRequiredLint from './paths--required.ts';
import definitionsTypeLint from './definitions--type.ts';
import parametersTypeLint from './parameters--type.ts';
import responsesTypeLint from './responses--type.ts';
import securityDefinitionsTypeLint from './security-definitions--type.ts';
import securityTypeLint from './security--type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';

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
