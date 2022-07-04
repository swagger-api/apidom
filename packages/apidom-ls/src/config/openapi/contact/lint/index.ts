import allowedFieldsLint from './allowed-fields';
import emailFormatEmailLint from './email--format-email';
import nameTypeLint from './name--type';
import urlFormatURILint from './url--format-uri';

const contactLints = [emailFormatEmailLint, nameTypeLint, urlFormatURILint, allowedFieldsLint];

export default contactLints;
