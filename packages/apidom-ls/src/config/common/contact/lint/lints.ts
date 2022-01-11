import contactEmailLint from './email';
import contactUrlLint from './url';
import contactNameLint from './name';
import contactAllowedFieldsLint from './allowed-fields';

const contactLints = [contactNameLint, contactEmailLint, contactUrlLint, contactAllowedFieldsLint];

export default contactLints;
