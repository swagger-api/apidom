import allowedFieldsLint from './allowed-fields';
import destinationTypeEqualsLint from './destination-type--equals';
import queueTypeLint from './queue--type';
import queueRequiredLint from './queue--required';
import topicTypeLint from './topic--type';
import topicRequiredLint from './topic--required';
import maxMsgLengthTypeLint from './max-msg-length--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  destinationTypeEqualsLint,
  queueTypeLint,
  queueRequiredLint,
  topicTypeLint,
  topicRequiredLint,
  maxMsgLengthTypeLint,
  bindingVersionTypeLint,
  allowedFieldsLint,
];

export default lints;
