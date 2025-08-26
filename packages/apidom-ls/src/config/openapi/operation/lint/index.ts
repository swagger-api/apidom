import allowedFields2_0Lint from './allowed-fields-2-0.ts';
import allowedFields3_0__3_1Lint from './allowed-fields-3-0--3-1.ts';
import tagsTypeLint from './tags--type.ts';
import summaryTypeLint from './summary--type.ts';
import descriptionTypeLint from './description--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';
import operationIdTypeLint from './operation-id--type.ts';
import operationIdUniqueLint from './operation-id--unique.ts';
import consumesTypeLint from './consumes--type.ts';
import producesTypeLint from './produces--type.ts';
import parametersTypeLint from './parameters--type.ts';
import parametersItemsTypeLint from './parameters--items-type.ts';
import parametersTypeConsumesRequiredLint from './parameters-type-consumes--required.ts';
import parametersInConsumesRequiredLint from './parameters-in-consumes--required.ts';
import parametersInOverlapsLint from './parameters-in--overlaps.ts';
import requestBodyTypeLint from './request-body--type.ts';
import responsesTypeLint from './responses--type.ts';
import responsesRequired2_0__3_0Lint from './responses-2-0--3-0--required.ts';
import schemesTypeLint from './schemes--type.ts';
import callbacksValuesTypeLint from './callbacks--values-type.ts';
import deprecatedTypeLint from './deprecated--type.ts';
import securityTypeLint from './security--type.ts';
import securityItemsTypeLint from './security--items-type.ts';
import serversTypeLint from './servers--type.ts';
import serversItemsTypeLint from '../../path-item/lint/servers--items-type.ts';
import requestBodyAllowedLint from './request-body--allowed.ts';
import requestBodyTentativelyAllowed from './request-body--tentatively-allowed.ts';

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
  parametersTypeConsumesRequiredLint,
  parametersInConsumesRequiredLint,
  parametersInOverlapsLint,
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
