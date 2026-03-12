import channelBinding0_0_1Lints from './0-0-1/index.ts';
import channelBinding0_1_0Lints from './0-1-0/index.ts';
import channelBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [
  ...channelBinding0_0_1Lints,
  ...channelBinding0_1_0Lints,
  ...channelBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
