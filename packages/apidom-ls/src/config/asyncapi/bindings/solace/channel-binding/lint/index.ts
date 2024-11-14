import channelBinding0_1_0Lints from './0-1-0/index.ts';
import channelBinding0_2_0Lints from './0-2-0/index.ts';
import channelBindingLatestLints from './latest/index.ts';

const lints = [
  ...channelBinding0_1_0Lints,
  ...channelBinding0_2_0Lints,
  ...channelBindingLatestLints,
];

export default lints;
