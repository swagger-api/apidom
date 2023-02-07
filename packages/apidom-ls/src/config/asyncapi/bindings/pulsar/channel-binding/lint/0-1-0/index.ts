import allowedFieldsLint from './allowed-fields';
import namespaceTypeLint from './namespace--type';
import namespaceRequiredLint from './namespace--required';
import persistenceEqualsLint from './persistence--equals';
import persistenceRequiredLint from './persistence--required';
import compactionTypeLint from './compaction--type';
import geoReplicationTypeLint from './geo-replication--type';
import retentionTypeLint from './retention--type';
import ttlTypeLint from './ttl--type';
import deduplicationTypeLint from './deduplication--type';

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
