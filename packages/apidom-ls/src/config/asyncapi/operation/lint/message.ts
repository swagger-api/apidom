import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationMessageLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_PUBLISH,
  source: 'apilint',
  message: '"message" must be a Message Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['message'],
  marker: 'value',
  target: 'message',
  data: {},
};

export default operationMessageLint;
