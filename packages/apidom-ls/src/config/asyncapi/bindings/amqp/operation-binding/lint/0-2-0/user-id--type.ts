import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const userIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_OPERATION_BINDING_FIELD_USER_ID_TYPE,
  source: 'apilint',
  message: "'userId' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'userId',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default userIdTypeLint;
