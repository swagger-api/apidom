import allowedFieldsLint from './allowed-fields';
import queueTypeLint from './queue--type';
import queueMaxLengthLint from './queue--max-length';
import bindingVersionTypeLint from './binding-version--type';

const lints = [allowedFieldsLint, queueTypeLint, queueMaxLengthLint, bindingVersionTypeLint];

export default lints;
