import allowedFieldsLint from './allowed-fields';
import destinationTypeEqualsLint from './destination-type--equals';
import queueTypeLint from './queue--type';
import queueRequiredLint from './queue--required';
import queueTopicMutuallyExclusiveLint from './queue-topic--mutually-exclusive';
import topicTypeLint from './topic--type';
import maxMsgLengthTypeLint from './max-msg-length--type';

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
