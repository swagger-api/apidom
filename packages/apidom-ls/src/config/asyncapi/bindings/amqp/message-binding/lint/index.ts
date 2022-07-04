import allowedFieldsLint from './allowed-fields';
import contentEncodingTypeLint from './content-encoding--type';
import messageTypeTypeLint from './message-type--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  contentEncodingTypeLint,
  messageTypeTypeLint,
  bindingVersionTypeLint,
  allowedFieldsLint,
];

export default lints;
