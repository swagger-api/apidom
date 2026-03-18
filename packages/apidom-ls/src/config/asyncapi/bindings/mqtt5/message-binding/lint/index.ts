import messageBinding0_1_0Lints from './0-1-0/index.ts';
import messageBinding0_2_0Lints from './0-2-0/index.ts';
import messageBindingLatestLints from './latest/index.ts';

const lints = [
  ...messageBinding0_1_0Lints,
  ...messageBinding0_2_0Lints,
  ...messageBindingLatestLints,
];

export default lints;
