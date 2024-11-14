import channelBinding0_0_1Lints from './0-0-1/index.ts';
import channelBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [...channelBinding0_0_1Lints, ...channelBindingLatestLints, bindingVersionTypeLint];

export default lints;
