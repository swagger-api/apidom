import allowedFieldsLint from './allowed-fields';
import qosTypeLint from './qos--equals';
import retainTypeLint from './retain--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [allowedFieldsLint, qosTypeLint, retainTypeLint, bindingVersionTypeLint];

export default lints;
