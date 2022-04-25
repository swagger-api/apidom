import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_SQS,
  source: 'apilint',
  message: '"sqs" must be a SQS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsChannelBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsLint;
