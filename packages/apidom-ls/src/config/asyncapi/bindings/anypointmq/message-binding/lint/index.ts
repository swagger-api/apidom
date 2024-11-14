import messageBinding0_0_1Lints from './0-0-1/index.ts';
import messageBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [...messageBinding0_0_1Lints, ...messageBindingLatestLints, bindingVersionTypeLint];

export default lints;
