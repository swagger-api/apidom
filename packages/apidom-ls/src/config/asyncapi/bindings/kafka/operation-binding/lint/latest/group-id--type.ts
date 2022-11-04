import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const groupIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_OPERATION_BINDING_FIELD_GROUP_ID_TYPE,
  source: 'apilint',
  message: 'groupId must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'groupdId',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default groupIdTypeLint;
