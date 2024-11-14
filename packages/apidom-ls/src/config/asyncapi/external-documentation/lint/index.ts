import allowedFieldsLint from './allowed-fields.ts';
import descriptionTypeLint from './description--type.ts';
import urlFormatURILint from './url--format-uri.ts';
import urlRequiredLint from './url--required.ts';

const lints = [descriptionTypeLint, urlFormatURILint, urlRequiredLint, allowedFieldsLint];

export default lints;
