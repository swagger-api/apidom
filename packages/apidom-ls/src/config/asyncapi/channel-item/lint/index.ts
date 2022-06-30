import allowedFieldsLint from './allowed-fields';
import $refValidLint from './$ref--valid';
import descriptionTypeLint from './description--type';
import serversTypeLint from './servers--type';
import serversKeysDefinedLint from './servers--keys-defined';
import subscribeTypeLint from './subscribe--type';
import publishTypeLint from './publish--type';
import parametersTypeLint from './parameters--type';
import bindingsTypeLint from './bindings--type';

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
];

export default lints;
