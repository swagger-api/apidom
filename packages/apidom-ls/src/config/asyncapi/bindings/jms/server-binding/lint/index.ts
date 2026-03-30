import serverBinding0_0_1Lints from './0-0-1/index.ts';
import serverBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [...serverBinding0_0_1Lints, ...serverBindingLatestLints, bindingVersionTypeLint];

export default lints;
