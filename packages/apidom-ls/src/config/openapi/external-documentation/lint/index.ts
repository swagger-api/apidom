import allowedFieldsLint from './allowed-fields';
import descriptionTypeLint from './description--type';
import urlRequiredLint from './url--required';
import urlFormatURILint from './url--format-uri';

const lints = [descriptionTypeLint, urlRequiredLint, urlFormatURILint, allowedFieldsLint];

export default lints;
