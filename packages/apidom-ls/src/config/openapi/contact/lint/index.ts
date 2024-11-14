import allowedFieldsLint from './allowed-fields.ts';
import emailFormatEmailLint from './email--format-email.ts';
import nameTypeLint from './name--type.ts';
import urlFormatURILint from './url--format-uri.ts';

const lints = [emailFormatEmailLint, nameTypeLint, urlFormatURILint, allowedFieldsLint];

export default lints;
