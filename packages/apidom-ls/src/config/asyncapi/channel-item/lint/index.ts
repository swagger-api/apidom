import allowedFieldsLint from './allowed-fields.ts';
import $refValidLint from './$ref--valid.ts';
import descriptionTypeLint from './description--type.ts';
import serversTypeLint from './servers--type.ts';
import serversKeysDefinedLint from './servers--keys-defined.ts';
import subscribeTypeLint from './subscribe--type.ts';
import publishTypeLint from './publish--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';

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
