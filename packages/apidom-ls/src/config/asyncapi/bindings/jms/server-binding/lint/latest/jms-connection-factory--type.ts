import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const jmsConnectionFactoryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_JMS_SERVER_BINDING_FIELD_JMS_CONNECTION_FACTORY_TYPE,
  source: 'apilint',
  message: "'jmsConnectionFactory' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'jmsConnectionFactory',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default jmsConnectionFactoryTypeLint;
