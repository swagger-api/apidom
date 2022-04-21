import contactEmailLint from './email';
import contactUrlLint from './url';
import contactNameLint from './name';
import contactAllowedFieldsLint from './allowed-fields';

const lints = [contactNameLint, contactEmailLint, contactUrlLint, contactAllowedFieldsLint];

export default lints;
