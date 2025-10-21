import valueWellFormedLint from './value--well-formed.ts';
import valueValidLint from './value--valid.ts';
import valueEquivalentNotAllowedLint from './value--equivalent-not-allowed.ts';

const lints = [valueWellFormedLint, valueValidLint, valueEquivalentNotAllowedLint];

export default lints;
