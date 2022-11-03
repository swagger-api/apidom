import channelBinding0_1_0Lints from './0-1-0';
import channelBinding0_2_0Lints from './0-2-0';
import channelBinding0_3_0Lints from './0-3-0';
import channelBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  ...channelBinding0_1_0Lints,
  ...channelBinding0_2_0Lints,
  ...channelBinding0_3_0Lints,
  ...channelBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
