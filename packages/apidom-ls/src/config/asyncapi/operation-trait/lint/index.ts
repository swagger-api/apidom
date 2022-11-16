import operationIdTypeLint from './operation-id--type';
import operationIdUniqueLint from './operation-id--unique';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import securityItemsTypeLint from './security--items-type';
import tagsTypeLint from './tags--type';
import externalDocsType from './external-docs--type';
import bindingsTypeLint from './bindings--type';
import allowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import allowedFields2_4__2_5Lint from './allowed-fields-2-4--2-5';

const lints = [
  operationIdTypeLint,
  operationIdUniqueLint,
  summaryTypeLint,
  descriptionTypeLint,
  securityItemsTypeLint,
  tagsTypeLint,
  externalDocsType,
  bindingsTypeLint,
  allowedFields2_0__2_3Lint,
  allowedFields2_4__2_5Lint,
];

export default lints;
