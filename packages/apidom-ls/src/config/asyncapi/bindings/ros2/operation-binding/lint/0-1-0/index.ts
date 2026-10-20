import allowedFieldsLint from './allowed-fields.ts';
import roleEqualsLint from './role--equals.ts';
import roleEqualsSendLint from './role--equals-send.ts';
import roleEqualsReceiveLint from './role--equals-receive.ts';
import nodeTypeLint from './node--type.ts';
import qosPoliciesTypeLint from './qos-policies--type.ts';

const lints = [
  roleEqualsLint,
  roleEqualsSendLint,
  roleEqualsReceiveLint,
  nodeTypeLint,
  qosPoliciesTypeLint,
  allowedFieldsLint,
];

export default lints;
