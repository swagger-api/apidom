import keysPatternLint from './keys--pattern';
import valuesTypeLint from './values--type';
import everyParameterDefinedLint from './paths--every--parameter--defined';

const lints = [valuesTypeLint, keysPatternLint, everyParameterDefinedLint];

export default lints;
