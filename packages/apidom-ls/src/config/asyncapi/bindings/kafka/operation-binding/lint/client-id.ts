import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const kafkaOperationBindingClientIdLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_KAFKA_CLIENT_ID,
  source: 'apilint',
  message: 'clientId must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'clientId',
  data: {},
};

export default kafkaOperationBindingClientIdLint;
