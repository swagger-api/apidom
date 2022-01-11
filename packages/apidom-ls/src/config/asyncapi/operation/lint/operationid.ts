import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationIdLint: LinterMeta = {
  code: ApilintCodes.OPERATION_ID,
  source: 'apilint',
  message: "operationId' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'operationId',
  data: {},
};

export default operationIdLint;
