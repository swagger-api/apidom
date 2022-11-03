import messageBinding0_1_0Lints from './0-1-0';
import messageBinding0_2_0Lints from './0-2-0';
import messageBinding0_3_0Lints from './0-3-0';
import messageBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  ...messageBinding0_1_0Lints,
  ...messageBinding0_2_0Lints,
  ...messageBinding0_3_0Lints,
  ...messageBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
