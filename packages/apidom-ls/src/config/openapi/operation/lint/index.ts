import allowedFields2_0Lint from './allowed-fields-2-0';
import allowedFields3_0__3_1Lint from './allowed-fields-3-0--3-1';
import tagsTypeLint from './tags--type';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import externalDocsTypeLint from './external-docs--type';
import operationIdTypeLint from './operation-id--type';
import operationIdUniqueLint from './operation-id--unique';
import consumesTypeLint from './consumes--type';
import producesTypeLint from './produces--type';
import parametersTypeLint from './parameters--type';
import parametersItemsTypeLint from './parameters--items-type';
import requestBodyTypeLint from './request-body--type';
import responsesTypeLint from './responses--type';
import responsesRequired2_0__3_0Lint from './responses-2-0--3-0--required';
import schemesTypeLint from './schemes--type';
import callbacksValuesTypeLint from './callbacks--values-type';
import deprecatedTypeLint from './deprecated--type';
import securityTypeLint from './security--type';
import securityItemsTypeLint from './security--items-type';
import serversTypeLint from './servers--type';
import serversItemsTypeLint from '../../path-item/lint/servers--items-type';
import requestBodyAllowedLint from './request-body--allowed';
import requestBodyTentativelyAllowed from './request-body--tentatively-allowed';

const lints = [
  tagsTypeLint,
  summaryTypeLint,
  descriptionTypeLint,
  externalDocsTypeLint,
  operationIdTypeLint,
  operationIdUniqueLint,
  consumesTypeLint,
  producesTypeLint,
  parametersTypeLint,
  parametersItemsTypeLint,
  requestBodyTypeLint,
  responsesTypeLint,
  responsesRequired2_0__3_0Lint,
  schemesTypeLint,
  callbacksValuesTypeLint,
  deprecatedTypeLint,
  securityTypeLint,
  securityItemsTypeLint,
  serversTypeLint,
  serversItemsTypeLint,
  allowedFields2_0Lint,
  allowedFields3_0__3_1Lint,
  requestBodyAllowedLint,
  requestBodyTentativelyAllowed,
];

export default lints;
