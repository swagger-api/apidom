import allowedFieldsLint from './allowed-fields.ts';
import topicTypeLint from './topic--type.ts';
import partitionsMinimumLint from './partitions--minimum.ts';
import replicasMinimumLint from './replicas--minimum.ts';

const lints = [topicTypeLint, partitionsMinimumLint, replicasMinimumLint, allowedFieldsLint];

export default lints;
