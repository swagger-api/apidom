import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import descriptionTypeLint from './description--type.ts';
import serversTypeLint from './servers--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import addressTypeLint from './address--type.ts';
import messagesTypeLint from './messages--type.ts';
import titleTypeLint from './title--type.ts';
import summaryTypeLint from './summary--type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';

const lints = [
  descriptionTypeLint,
  serversTypeLint,
  parametersTypeLint,
  bindingsTypeLint,
  allowedFields3_0Lint,
  addressTypeLint,
  messagesTypeLint,
  titleTypeLint,
  summaryTypeLint,
  tagsTypeLint,
  externalDocsTypeLint,
];

export default lints;
