import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const isEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_CHANNEL_BINDING_FIELD_IS_EQUALS,
  source: 'apilint',
  message: "'is' must be one of allowed values",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['queue', 'routingKey']],
  marker: 'value',
  target: 'is',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default isEqualsLint;
