import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFieldsLint3_1 from './allowed-fields-3-1.ts';
import schemasValuesTypeLint from './schemas--values-type.ts';
import schemasValuesTypeOpenAPI3_1_AsyncAPI2Lint from './schemas--values-type-openapi-3-1-asyncapi-2.ts';
import responsesValuesTypeLint from './responses--values-type.ts';
import parametersValuesTypeLint from './parameters--values-type.ts';
import examplesValuesTypeLint from './examples--values-type.ts';
import requestBodiesValuesTypeLint from './request-bodies--values-type.ts';
import headersValuesTypeLint from './headers--values-type.ts';
import securitySchemesValuesType from './security-schemes--values-type.ts';
import linksValuesTypeLint from './links--values-type.ts';
import callbacksValuesTypeLint from './callbacks--values-type.ts';
import keysPatternLint from './keys--pattern.ts';
import pathItemsValuesTypeLint from './path-items--values-type.ts';

const lints = [
  schemasValuesTypeLint,
  schemasValuesTypeOpenAPI3_1_AsyncAPI2Lint,
  responsesValuesTypeLint,
  parametersValuesTypeLint,
  examplesValuesTypeLint,
  requestBodiesValuesTypeLint,
  headersValuesTypeLint,
  securitySchemesValuesType,
  linksValuesTypeLint,
  callbacksValuesTypeLint,
  keysPatternLint,
  pathItemsValuesTypeLint,
  allowedFields3_0Lint,
  allowedFieldsLint3_1,
];

export default lints;
