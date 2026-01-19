import operationIdTypeLint from './operation-id--type.ts';
import operationIdUniqueLint from './operation-id--unique.ts';
import summaryTypeLint from './summary--type.ts';
import descriptionTypeLint from './description--type.ts';
import securityItemsType2_0__2_6Lint from './security--items-type-2-0--2-6.ts';
import securityItemsType3_0Lint from './security--items-type-3-0.ts';
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
  securityItemsType2_0__2_6Lint,
  securityItemsType3_0Lint,
  tagsTypeLint,
  externalDocsType,
  bindingsTypeLint,
  allowedFields2_0__2_3Lint,
  allowedFields2_4__2_6Lint,
];

export default lints;
