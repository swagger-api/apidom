import serverBinding0_1_0Lints from './0-1-0';
import serverBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [...serverBinding0_1_0Lints, ...serverBindingLatestLints, bindingVersionTypeLint];

export default lints;
