import valuesTypeLint from './values--type.ts';
import $refNotUsedLint from '../../../common/schema/lint/$ref--not-used.ts';

const lints = [valuesTypeLint, $refNotUsedLint];

export default lints;
