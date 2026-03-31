import allowedFieldsLint from './allowed-fields.ts';
import jmsConnectionFactoryRequiredLint from './jms-connection-factory--required.ts';
import jmsConnectionFactoryTypeLint from './jms-connection-factory--type.ts';
import propertiesTypeLint from './properties--type.ts';
import clientIDTypeLint from './client-id--type.ts';

const lints = [
  jmsConnectionFactoryRequiredLint,
  jmsConnectionFactoryTypeLint,
  propertiesTypeLint,
  clientIDTypeLint,
  allowedFieldsLint,
];

export default lints;
