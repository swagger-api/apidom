import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mainInfoObjectLint: LinterMeta = {
  code: ApilintCodes.EXTERNALDOC_OBJECT,
  source: 'apilint',
  message: 'info must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['info'],
  marker: 'value',
  target: 'info',
  data: {},
};

export default mainInfoObjectLint;
