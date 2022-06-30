import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import emailTypeLint from './email--type';
import urlTypeLint from './url--type';

const lints = [nameTypeLint, emailTypeLint, urlTypeLint, allowedFieldsLint];

export default lints;
