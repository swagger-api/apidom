import allowedFieldsLint from './allowed-fields';
import groupIdTypeLint from './group-id--type';
import ccdtQueueManagerNameTypeLint from './ccdt-queue-manager-name--type';
import cipherSpecTypeLint from './cipher-spec--type.ts';
import multiEndpointServerTypeLint from './multi-endpoint-server--type';
import heartBeatIntervalTypeLint from './heart-beat-internal--type';
import heartBeatIntervalMaximumLint from './heart-beat-internal--maximum';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  groupIdTypeLint,
  ccdtQueueManagerNameTypeLint,
  cipherSpecTypeLint,
  multiEndpointServerTypeLint,
  heartBeatIntervalTypeLint,
  heartBeatIntervalMaximumLint,
  bindingVersionTypeLint,
  allowedFieldsLint,
];

export default lints;
