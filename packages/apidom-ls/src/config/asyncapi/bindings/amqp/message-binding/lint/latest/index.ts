import allowedFieldsLint from './allowed-fields';
import contentEncodingTypeLint from './content-encoding--type';
import messageTypeTypeLint from './message-type--type';

const lints = [contentEncodingTypeLint, messageTypeTypeLint, allowedFieldsLint];

export default lints;
