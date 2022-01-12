import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_SQS,
  source: 'apilint',
  message: '"sqs" must be a SQS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsServerBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsLint;
