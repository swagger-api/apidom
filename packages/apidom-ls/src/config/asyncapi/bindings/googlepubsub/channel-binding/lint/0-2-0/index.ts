import allowedFieldsLint from './allowed-fields.ts';
import labelsTypeLint from './labels--type.ts';
import messageRetentionDurationTypeLint from './message-retention-duration--type.ts';
import messageStoragePolicyTypeLint from './message-storage-policy--type.ts';
import schemaSettingsTypeLint from './schema-settings--type.ts';

const lints = [
  labelsTypeLint,
  messageRetentionDurationTypeLint,
  messageStoragePolicyTypeLint,
  schemaSettingsTypeLint,
  allowedFieldsLint,
];

export default lints;
