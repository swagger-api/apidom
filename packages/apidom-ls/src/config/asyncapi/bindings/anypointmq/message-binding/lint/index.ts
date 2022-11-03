import messageBinding0_0_1Lints from './0-0-1';
import messageBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [...messageBinding0_0_1Lints, ...messageBindingLatestLints, bindingVersionTypeLint];

export default lints;
