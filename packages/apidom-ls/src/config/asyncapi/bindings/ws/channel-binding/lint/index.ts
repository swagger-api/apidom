import channelBinding0_1_0Lints from './0.1.0';
import channelBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [...channelBinding0_1_0Lints, ...channelBindingLatestLints, bindingVersionTypeLint];

export default lints;
