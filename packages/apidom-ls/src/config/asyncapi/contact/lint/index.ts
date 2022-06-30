import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import emailTypeLint from './email--type';
import urlFormatURILint from './url--format-uri';

const lints = [nameTypeLint, emailTypeLint, urlFormatURILint, allowedFieldsLint];

export default lints;
