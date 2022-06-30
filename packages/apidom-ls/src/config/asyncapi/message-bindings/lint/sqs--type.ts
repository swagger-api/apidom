import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const sqsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_SQS_TYPE,
  source: 'apilint',
  message: '"sqs" must be a SQS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['sqsMessageBinding'],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsTypeLint;
