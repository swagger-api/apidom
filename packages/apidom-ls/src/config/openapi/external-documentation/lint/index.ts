import allowedFieldsLint from './allowed-fields.ts';
import descriptionTypeLint from './description--type.ts';
import urlRequiredLint from './url--required.ts';
import urlFormatURILint from './url--format-uri.ts';

const lints = [descriptionTypeLint, urlRequiredLint, urlFormatURILint, allowedFieldsLint];

export default lints;
