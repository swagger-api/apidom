import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverBindingsObjectLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDINGS,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['serverBindings'],
  marker: 'value',
  target: 'bindings',
  data: {},
};

export default serverBindingsObjectLint;
