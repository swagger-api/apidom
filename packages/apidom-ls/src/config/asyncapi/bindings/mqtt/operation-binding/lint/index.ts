import allowedFieldsLint from './allowed-fields';
import qosEqualsLint from './qos--equals';
import retainTypeLint from './retain--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [allowedFieldsLint, qosEqualsLint, retainTypeLint, bindingVersionTypeLint];

export default lints;
