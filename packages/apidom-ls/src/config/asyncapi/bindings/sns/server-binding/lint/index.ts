import serverBinding0_1_0Lints from './0-1-0/index.ts';
import serverBinding0_2_0Lints from './0-2-0/index.ts';
import serverBinding1_0_0Lints from './1-0-0/index.ts';
import serverBindingLatestLints from './latest/index.ts';

const lints = [
  ...serverBinding0_1_0Lints,
  ...serverBinding0_2_0Lints,
  ...serverBinding1_0_0Lints,
  ...serverBindingLatestLints,
];

export default lints;
