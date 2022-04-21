import componentsSchemasLint from './schemas';
import componentsSchemasObjectLint from './schemas-object';
import componentsAllowedFieldsLint from './allowed-fields';
import componentsKeysLint from './components-keys';
import componentsChannelBindingsLint from './channel-bindings';
import componentsMessagesLint from './messages';
import componentsSecuritySchemesLint from './security-schemes';
import componentsParametersLint from './parameters';
import componentsCorrelationIDsLint from './correlation-ids';
import componentsOperationTraitsLint from './operation-traits';
import componentsMessageTraitsLint from './message-traits';
import componentsServerBindingsLint from './server-bindings';
import componentsOperationBindingsLint from './operation-bindings';
import componentsMessageBindingsLint from './message-bindings';

const lints = [
  componentsSchemasLint,
  componentsSchemasObjectLint,
  componentsAllowedFieldsLint,
  componentsKeysLint,
  componentsChannelBindingsLint,
  componentsMessagesLint,
  componentsSecuritySchemesLint,
  componentsParametersLint,
  componentsCorrelationIDsLint,
  componentsOperationTraitsLint,
  componentsMessageTraitsLint,
  componentsServerBindingsLint,
  componentsOperationBindingsLint,
  componentsMessageBindingsLint,
];

export default lints;
