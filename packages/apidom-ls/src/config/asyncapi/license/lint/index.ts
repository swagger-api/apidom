import allowedFieldsLint from './allowed-fields.ts';
import nameTypeLint from './name--type.ts';
import nameRequiredLint from './name--required.ts';
import urlFormatURILint from './url--format-uri.ts';

const lints = [nameTypeLint, nameRequiredLint, urlFormatURILint, allowedFieldsLint];

export default lints;
