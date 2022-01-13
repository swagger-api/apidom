import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_SQS,
  source: 'apilint',
  message: '"sqs" must be a SQS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsMessageBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsLint;
