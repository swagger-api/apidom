import allowedFieldsLint from './allowed-fields';
import tagsTypeLint from './tags--type';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import externalDocsTypeLint from './external-docs--type';
import operationIdTypeLint from './operation-id--type';
import operationIdUniqueLint from './operation-id--unique';
import parametersTypeLint from './parameters--type';
import parametersItemsTypeLint from './parameters--items-type';
import requestBodyTypeLint from './request-body--type';
import responsesTypeLint from './responses--type';
import responsesRequired3_0Lint from './responses-3-0--required';
import callbacksValuesTypeLint from './callbacks--values-type';
import deprecatedTypeLint from './deprecated--type';
import securityTypeLint from './security--type';
import securityItemsTypeLint from './security--items-type';
import serversTypeLint from './servers--type';
import serversItemsTypeLint from '../../path-item/lint/servers--items-type';

const lints = [
  tagsTypeLint,
  summaryTypeLint,
  descriptionTypeLint,
  externalDocsTypeLint,
  operationIdTypeLint,
  operationIdUniqueLint,
  parametersTypeLint,
  parametersItemsTypeLint,
  requestBodyTypeLint,
  responsesTypeLint,
  responsesRequired3_0Lint,
  callbacksValuesTypeLint,
  deprecatedTypeLint,
  securityTypeLint,
  securityItemsTypeLint,
  serversTypeLint,
  serversItemsTypeLint,
  allowedFieldsLint,
];

export default lints;
