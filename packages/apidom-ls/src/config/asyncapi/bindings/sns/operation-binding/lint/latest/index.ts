import allowedFieldsLint from './allowed-fields.ts';
import consumersRequiredLint from './consumers--required.ts';
import consumersTypeLint from './consumers--type.ts';
import deliveryPolicyTypeLint from './delivery-policy--type.ts';
import topicTypeLint from './topic--type.ts';

const lints = [
  consumersRequiredLint,
  consumersTypeLint,
  topicTypeLint,
  deliveryPolicyTypeLint,
  allowedFieldsLint,
];

export default lints;
