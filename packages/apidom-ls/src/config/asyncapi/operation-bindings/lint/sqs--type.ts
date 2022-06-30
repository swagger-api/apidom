import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_SQS_TYPE,
  source: 'apilint',
  message: '"sqs" must be a SQS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsOperationBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsTypeLint;
