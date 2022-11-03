import channelBinding0_0_1Lints from './0-0-1';
import channelBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [...channelBinding0_0_1Lints, ...channelBindingLatestLints, bindingVersionTypeLint];

export default lints;
