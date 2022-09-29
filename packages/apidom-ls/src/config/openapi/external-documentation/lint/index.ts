import allowedFieldsLint from './allowed-fields';
import descriptionTypeLint from './description--type';
import urlRequiredLint from './url--required';
import urlFormatURILint from './url--format-uri';

const contactLints = [descriptionTypeLint, urlRequiredLint, urlFormatURILint, allowedFieldsLint];

export default contactLints;
