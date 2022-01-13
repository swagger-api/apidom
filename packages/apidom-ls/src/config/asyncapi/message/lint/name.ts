import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageNameLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_NAME,
  source: 'apilint',
  message: "name' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default messageNameLint;
