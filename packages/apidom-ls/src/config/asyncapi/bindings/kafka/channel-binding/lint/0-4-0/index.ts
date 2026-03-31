import allowedFieldsLint from './allowed-fields.ts';
import topicTypeLint from './topic--type.ts';
import partitionsMinimumLint from './partitions--minimum.ts';
import replicasMinimumLint from './replicas--minimum.ts';
import topicConfigurationTypeLint from './topic-configuration--type.ts';

const lints = [
  topicTypeLint,
  partitionsMinimumLint,
  replicasMinimumLint,
  topicConfigurationTypeLint,
  allowedFieldsLint,
];

export default lints;
