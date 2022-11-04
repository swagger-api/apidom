import messageBinding0_1_0Lints from './0-1-0';
import messageBinding0_2_0Lints from './0-2-0';
import messageBindingLatestLints from './latest';

const lints = [
  ...messageBinding0_1_0Lints,
  ...messageBinding0_2_0Lints,
  ...messageBindingLatestLints,
];

export default lints;
