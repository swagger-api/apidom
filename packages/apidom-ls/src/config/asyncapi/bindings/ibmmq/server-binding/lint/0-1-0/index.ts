import allowedFieldsLint from './allowed-fields.ts';
import groupIdTypeLint from './group-id--type.ts';
import ccdtQueueManagerNameTypeLint from './ccdt-queue-manager-name--type.ts';
import cipherSpecTypeLint from './cipher-spec--type.ts';
import multiEndpointServerTypeLint from './multi-endpoint-server--type.ts';
import heartBeatIntervalTypeLint from './heart-beat-internal--type.ts';
import heartBeatIntervalMaximumLint from './heart-beat-internal--maximum.ts';

const lints = [
  groupIdTypeLint,
  ccdtQueueManagerNameTypeLint,
  cipherSpecTypeLint,
  multiEndpointServerTypeLint,
  heartBeatIntervalTypeLint,
  heartBeatIntervalMaximumLint,
  allowedFieldsLint,
];

export default lints;
