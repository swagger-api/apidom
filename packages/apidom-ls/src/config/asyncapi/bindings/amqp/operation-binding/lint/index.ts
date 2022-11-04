import operationBinding0_1_0Lints from './0-1-0';
import operationBinding0_2_0Lints from './0-2-0';
import operationBindingLatestLints from './latest';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  ...operationBinding0_1_0Lints,
  ...operationBinding0_2_0Lints,
  ...operationBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
