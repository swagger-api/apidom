import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFieldsLint3_1 from './allowed-fields-3-1';
import schemasValuesTypeLint from './schemas--values-type';
import responsesValuesTypeLint from './responses--values-type';
import parametersValuesTypeLint from './parameters--values-type';
import examplesValuesTypeLint from './examples--values-type';
import requestBodiesValuesTypeLint from './request-bodies--values-type';
import headersValuesTypeLint from './headers--values-type';
import securitySchemesValuesType from './security-schemes--values-type';
import linksValuesTypeLint from './links--values-type';
import callbacksValuesTypeLint from './callbacks--values-type';
import keysPatternLint from './keys--pattern';
import pathItemsValuesTypeLint from './path-items--values-type';

const lints = [
  schemasValuesTypeLint,
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
