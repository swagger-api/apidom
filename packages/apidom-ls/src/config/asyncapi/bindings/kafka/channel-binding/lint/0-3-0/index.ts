import allowedFieldsLint from './allowed-fields';
import topicTypeLint from './topic--type';
import partitionsMinimumLint from './partitions--minimum';
import replicasMinimumLint from './replicas--minimum';

const lints = [topicTypeLint, partitionsMinimumLint, replicasMinimumLint, allowedFieldsLint];

export default lints;
