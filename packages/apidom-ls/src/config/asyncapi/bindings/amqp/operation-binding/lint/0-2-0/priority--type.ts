import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const priorityTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_OPERATION_BINDING_FIELD_PRIORITY_TYPE,
  source: 'apilint',
  message: "'priority' must be an integer",
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true],
  marker: 'value',
  target: 'priority',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default priorityTypeLint;
