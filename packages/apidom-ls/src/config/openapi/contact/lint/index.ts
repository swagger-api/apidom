import allowedFieldsLint from './allowed-fields';
import emailFormatEmailLint from './email--format-email';
import nameTypeLint from './name--type';
import urlFormatURILint from './url--format-uri';

const lints = [emailFormatEmailLint, nameTypeLint, urlFormatURILint, allowedFieldsLint];

export default lints;
