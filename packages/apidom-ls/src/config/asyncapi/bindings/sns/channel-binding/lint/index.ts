import channelBinding0_1_0Lints from './0-1-0/index.ts';
import channelBinding0_2_0Lints from './0-2-0/index.ts';
import channelBinding1_0_0Lints from './1-0-0/index.ts';
import channelBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [
  ...channelBinding0_1_0Lints,
  ...channelBinding0_2_0Lints,
  ...channelBinding1_0_0Lints,
  ...channelBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
