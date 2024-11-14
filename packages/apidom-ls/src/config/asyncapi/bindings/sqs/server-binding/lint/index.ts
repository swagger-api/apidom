import serverBinding0_1_0Lints from './0-1-0/index.ts';
import serverBindingLatestLints from './latest/index.ts';

const lints = [...serverBinding0_1_0Lints, ...serverBindingLatestLints];

export default lints;
