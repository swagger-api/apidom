import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_SQS,
  source: 'apilint',
  message: '"sqs" must be a SQS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsOperationBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsLint;
