import operationBinding0_1_0Lints from './0-1-0/index.ts';
import operationBindingLatestLints from './latest/index.ts';
import bindingVersionTypeLint from './binding-version--type.ts';

const lints = [
  ...operationBinding0_1_0Lints,
  ...operationBindingLatestLints,
  bindingVersionTypeLint,
];

export default lints;
