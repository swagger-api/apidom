import operationBinding0_0_1Lints from './0-0-1/index.ts';
import operationBinding0_1_0Lints from './0-1-0/index.ts';
import operationBindingLatestLints from './latest/index.ts';

const lints = [
  ...operationBinding0_0_1Lints,
  ...operationBinding0_1_0Lints,
  ...operationBindingLatestLints,
];

export default lints;
