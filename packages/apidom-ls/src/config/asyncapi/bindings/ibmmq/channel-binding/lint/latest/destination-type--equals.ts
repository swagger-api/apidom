import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const destinationTypeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_DESTINATION_TYPE_EQUALS,
  source: 'apilint',
  message: "'destinationType' must be one of allowed values",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['queue', 'topic']],
  marker: 'value',
  target: 'destinationType',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default destinationTypeEqualsLint;
