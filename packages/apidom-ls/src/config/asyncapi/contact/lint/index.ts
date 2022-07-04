import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import emailFormatEmailLint from './email--format-email';
import urlFormatURILint from './url--format-uri';

const lints = [nameTypeLint, emailFormatEmailLint, urlFormatURILint, allowedFieldsLint];

export default lints;
