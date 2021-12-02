import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoObjectLint: LinterMeta = {
  code: ApilintCodes.INFO_OBJECT,
  source: 'apilint',
  message: 'info must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['info'],
  marker: 'value',
  target: 'info',
  data: {},
};

export default infoObjectLint;
