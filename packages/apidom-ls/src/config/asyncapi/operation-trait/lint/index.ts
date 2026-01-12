import operationIdTypeLint from './operation-id--type.ts';
import operationIdUniqueLint from './operation-id--unique.ts';
import summaryTypeLint from './summary--type.ts';
import descriptionTypeLint from './description--type.ts';
import securityItemsTypeLint from './security--items-type.ts';
import security3_0ItemsTypeLint from './security-3-0--items-type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsType from './external-docs--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import allowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3.ts';
import allowedFields2_4__2_6Lint from './allowed-fields-2-4--2-6.ts';

const lints = [
  operationIdTypeLint,
  operationIdUniqueLint,
  summaryTypeLint,
  descriptionTypeLint,
  securityItemsTypeLint,
  security3_0ItemsTypeLint,
  tagsTypeLint,
  externalDocsType,
  bindingsTypeLint,
  allowedFields2_0__2_3Lint,
  allowedFields2_4__2_6Lint,
];

export default lints;
