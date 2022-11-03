import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_MESSAGE_BINDING_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'qos' must be one of allowed values",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['string', 'jms', 'binary']],
  marker: 'value',
  target: 'qos',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default typeEqualsLint;
