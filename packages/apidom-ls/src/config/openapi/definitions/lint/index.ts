import valuesTypeLint from './values--type.ts';
import $refNotUsedLint from '../../../common/schema/lint/$ref--not-used.ts';
import $refNoSiblingsLint from '../../../common/schema/lint/$ref--no-siblings.ts';

const lints = [valuesTypeLint, $refNotUsedLint, $refNoSiblingsLint];

export default lints;
