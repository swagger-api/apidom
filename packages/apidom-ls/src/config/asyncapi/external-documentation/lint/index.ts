import allowedFieldsLint from './allowed-fields';
import descriptionTypeLint from './description--type';
import urlFormatURILint from './url--format-uri';
import urlRequiredLint from './url--required';

const lints = [descriptionTypeLint, urlFormatURILint, urlRequiredLint, allowedFieldsLint];

export default lints;
