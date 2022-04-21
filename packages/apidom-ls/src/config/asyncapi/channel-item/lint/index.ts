import channel$RefLint from './ref';
import channelDescriptionLint from './description';
import channelRefNonSiblingsLint from './ref-non-siblings';
import serversKeysLint from './servers-keys';
import channelServersLint from './servers';
import channelSubscribeLint from './subscribe';
import channelPublishLint from './publish';
import channelParametersLint from './parameters';
import channelBindingsLint from './bindings';
import channelAllowedFieldsLint from './allowed-fields';

const lints = [
  channel$RefLint,
  channelDescriptionLint,
  channelRefNonSiblingsLint,
  serversKeysLint,
  channelServersLint,
  channelSubscribeLint,
  channelPublishLint,
  channelParametersLint,
  channelBindingsLint,
  channelAllowedFieldsLint,
];

export default lints;
