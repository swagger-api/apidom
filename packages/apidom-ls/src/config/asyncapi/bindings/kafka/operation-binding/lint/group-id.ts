import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const kafkaOperationBindingGroupIdLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_KAFKA_GROUP_ID,
  source: 'apilint',
  message: 'groupId must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'groupdId',
  data: {},
};

export default kafkaOperationBindingGroupIdLint;
