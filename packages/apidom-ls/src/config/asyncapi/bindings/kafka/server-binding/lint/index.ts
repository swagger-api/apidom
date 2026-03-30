import serverBinding0_1_0Lints from './0-1-0/index.ts';
import serverBinding0_2_0Lints from './0-2-0/index.ts';
import serverBinding0_3_0Lints from './0-3-0/index.ts';
import serverBinding0_4_0Lints from './0-4-0/index.ts';
import serverBinding0_5_0Lints from './0-5-0/index.ts';
import serverBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [
  ...serverBinding0_1_0Lints,
  ...serverBinding0_2_0Lints,
  ...serverBinding0_3_0Lints,
  ...serverBinding0_4_0Lints,
  ...serverBinding0_5_0Lints,
  ...serverBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
