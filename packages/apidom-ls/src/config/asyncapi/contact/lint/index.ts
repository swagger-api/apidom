import allowedFieldsLint from './allowed-fields.ts';
import nameTypeLint from './name--type.ts';
import emailFormatEmailLint from './email--format-email.ts';
import urlFormatURILint from './url--format-uri.ts';

const lints = [nameTypeLint, emailFormatEmailLint, urlFormatURILint, allowedFieldsLint];

export default lints;
