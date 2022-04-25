import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_SNS,
  source: 'apilint',
  message: '"sns" must be a SNS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsOperationBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsLint;
