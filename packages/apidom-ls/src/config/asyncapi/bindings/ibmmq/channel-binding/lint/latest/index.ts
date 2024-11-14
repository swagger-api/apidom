import allowedFieldsLint from './allowed-fields.ts';
import destinationTypeEqualsLint from './destination-type--equals.ts';
import queueTypeLint from './queue--type.ts';
import queueRequiredLint from './queue--required.ts';
import queueTopicMutuallyExclusiveLint from './queue-topic--mutually-exclusive.ts';
import topicTypeLint from './topic--type.ts';
import maxMsgLengthTypeLint from './max-msg-length--type.ts';

const lints = [
  destinationTypeEqualsLint,
  queueTypeLint,
  queueRequiredLint,
  queueTopicMutuallyExclusiveLint,
  topicTypeLint,
  maxMsgLengthTypeLint,
  allowedFieldsLint,
];

export default lints;
