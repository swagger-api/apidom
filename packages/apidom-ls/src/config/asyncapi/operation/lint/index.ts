import operationIdTypeLint from './operation-id--type';
import operationIdUniqueLint from './operation-id--unique';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import securityTypeLint from './security--type';
import securityItemsTypeLint from './security--items-type';
import tagsTypeLint from './tags--type';
import externalDocsType from './external-docs--type';
import bindingsTypeLint from './bindings--type';
import traitsTypeLint from './traits--type';
import traitsItemsTypeLint from './traits--items-type';
import messageTypeLint from './message--type';
import operationAllowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import operationAllowedFields2_4Lint from './allowed-fields-2-4';

const lints = [
  operationIdTypeLint,
  operationIdUniqueLint,
  summaryTypeLint,
  descriptionTypeLint,
  securityTypeLint,
  securityItemsTypeLint,
  tagsTypeLint,
  externalDocsType,
  bindingsTypeLint,
  traitsTypeLint,
  traitsItemsTypeLint,
  messageTypeLint,
  operationAllowedFields2_0__2_3Lint,
  operationAllowedFields2_4Lint,
];

export default lints;
