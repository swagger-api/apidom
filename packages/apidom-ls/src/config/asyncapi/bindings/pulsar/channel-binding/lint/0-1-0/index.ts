import allowedFieldsLint from './allowed-fields';
import namespaceTypeLint from './namespace--type';
import persistenceEqualsLint from './persistence--equals';
import geoReplicationTypeLint from './geo-replication--type';
import retentionTypeLint from './retention--type';
import ttlTypeLint from './ttl--type';
import deduplicationTypeLint from './deduplication--type';

const lints = [
  namespaceTypeLint,
  persistenceEqualsLint,
  geoReplicationTypeLint,
  retentionTypeLint,
  ttlTypeLint,
  deduplicationTypeLint,
  allowedFieldsLint,
];

export default lints;
