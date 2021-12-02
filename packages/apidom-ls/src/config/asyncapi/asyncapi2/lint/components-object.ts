import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsObjectLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_OBJECT,
  source: 'apilint',
  message: 'components must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['components'],
  marker: 'value',
  target: 'components',
  data: {},
};

export default componentsObjectLint;
