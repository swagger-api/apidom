import allowedFieldsLint from './allowed-fields';
import groupIdTypeLint from './group-id--type';
import ccdtQueueManagerNameTypeLint from './ccdt-queue-manager-name--type';
import cipherSpecTypeLint from './cipher-spec--type';
import multiEndpointServerTypeLint from './multi-endpoint-server--type';
import heartBeatIntervalTypeLint from './heart-beat-internal--type';
import heartBeatIntervalMaximumLint from './heart-beat-internal--maximum';

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
