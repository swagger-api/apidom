import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import urlFormatURILint from './url--format-uri';

const lints = [nameTypeLint, nameRequiredLint, urlFormatURILint, allowedFieldsLint];

export default lints;
