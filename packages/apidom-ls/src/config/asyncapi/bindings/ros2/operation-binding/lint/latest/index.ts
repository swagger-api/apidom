import allowedFieldsLint from './allowed-fields.ts';
import roleTypeLint from './role--type.ts';
import roleEqualsLint from './role--equals.ts';
import nodeTypeLint from './node--type.ts';
import qosPoliciesTypeLint from './qos-policies--type.ts';

const lints = [roleTypeLint, roleEqualsLint, nodeTypeLint, qosPoliciesTypeLint, allowedFieldsLint];

export default lints;
