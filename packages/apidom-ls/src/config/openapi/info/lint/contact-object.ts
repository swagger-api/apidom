import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contactObjectLint: LinterMeta = {
  code: ApilintCodes.INFO_CONTACT,
  source: 'apilint',
  message: 'contact must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['contact'],
  marker: 'value',
  target: 'contact',
  data: {},
};

export default contactObjectLint;
