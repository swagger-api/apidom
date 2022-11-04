import allowedFieldsLint from './allowed-fields';
import labelsTypeLint from './labels--type';
import messageRetentionDurationTypeLint from './message-retention-duration--type';
import messageStoragePolicyTypeLint from './message-storage-policy--type';
import schemaSettingsTypeLint from './schema-settings--type';
import topicTypeLint from './topic--type';

const lints = [
  labelsTypeLint,
  messageRetentionDurationTypeLint,
  messageStoragePolicyTypeLint,
  schemaSettingsTypeLint,
  topicTypeLint,
  allowedFieldsLint,
];

export default lints;
