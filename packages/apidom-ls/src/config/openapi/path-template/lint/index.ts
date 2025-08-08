import valueWellFormedLint from './value--well-formed.ts';
import valueValidLint from './value--valid.ts';
import equivalentPathsNotAllowedLint from './equivalent-paths-not-allowed.ts';

const lints = [valueWellFormedLint, valueValidLint, equivalentPathsNotAllowedLint];

export default lints;
