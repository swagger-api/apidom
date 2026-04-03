import messageBinding0_1_0Lints from './0-1-0/index.ts';
import messageBinding0_2_0Lints from './0-2-0/index.ts';
import messageBinding0_3_0Lints from './0-3-0/index.ts';
import messageBinding0_4_0Lints from './0-4-0/index.ts';
import messageBinding0_5_0Lints from './0-5-0/index.ts';
import messageBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [
  ...messageBinding0_1_0Lints,
  ...messageBinding0_2_0Lints,
  ...messageBinding0_3_0Lints,
  ...messageBinding0_4_0Lints,
  ...messageBinding0_5_0Lints,
  ...messageBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
