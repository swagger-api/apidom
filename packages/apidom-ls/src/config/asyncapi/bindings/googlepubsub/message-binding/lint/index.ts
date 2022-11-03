import messageBinding0_1_0Lints from './0-1-0';
import messageBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [...messageBinding0_1_0Lints, ...messageBindingLatestLints, bindingVersionTypeLint];

export default lints;
