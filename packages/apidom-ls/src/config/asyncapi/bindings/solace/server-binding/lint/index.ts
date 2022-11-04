import serverBinding0_1_0Lints from './0-1-0';
import serverBinding0_2_0Lints from './0-2-0';
import serverBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  ...serverBinding0_1_0Lints,
  ...serverBinding0_2_0Lints,
  ...serverBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
