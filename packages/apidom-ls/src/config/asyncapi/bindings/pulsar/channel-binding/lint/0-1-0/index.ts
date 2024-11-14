import allowedFieldsLint from './allowed-fields.ts';
import namespaceTypeLint from './namespace--type.ts';
import namespaceRequiredLint from './namespace--required.ts';
import persistenceEqualsLint from './persistence--equals.ts';
import persistenceRequiredLint from './persistence--required.ts';
import compactionTypeLint from './compaction--type.ts';
import geoReplicationTypeLint from './geo-replication--type.ts';
import retentionTypeLint from './retention--type.ts';
import ttlTypeLint from './ttl--type.ts';
import deduplicationTypeLint from './deduplication--type.ts';

const lints = [
  namespaceTypeLint,
  namespaceRequiredLint,
  persistenceEqualsLint,
  persistenceRequiredLint,
  compactionTypeLint,
  geoReplicationTypeLint,
  retentionTypeLint,
  ttlTypeLint,
  deduplicationTypeLint,
  allowedFieldsLint,
];

export default lints;
