import allowedFieldsLint from './allowed-fields.ts';
import contentEncodingTypeLint from './content-encoding--type.ts';
import messageTypeTypeLint from './message-type--type.ts';

const lints = [contentEncodingTypeLint, messageTypeTypeLint, allowedFieldsLint];

export default lints;
