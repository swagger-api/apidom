import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import $refValidLint from './$ref--valid.ts';
import descriptionTypeLint from './description--type.ts';
import serversTypeLint from './servers--type.ts';
import serversKeysDefinedLint from './servers--keys-defined.ts';
import subscribeTypeLint from './subscribe--type.ts';
import publishTypeLint from './publish--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import addressTypeLint from './address--type.ts';
import messagesTypeLint from './messages--type.ts';
import titleTypeLint from './title--type.ts';
import summaryTypeLint from './summary--type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';

const lints = [
  $refValidLint,
  descriptionTypeLint,
  serversTypeLint,
  serversKeysDefinedLint,
  subscribeTypeLint,
  publishTypeLint,
  parametersTypeLint,
  bindingsTypeLint,
  allowedFieldsLint,
  allowedFields3_0Lint,
  addressTypeLint,
  messagesTypeLint,
  titleTypeLint,
  summaryTypeLint,
  tagsTypeLint,
  externalDocsTypeLint,
];

export default lints;
