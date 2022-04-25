import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageBindingsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDINGS,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['messageBindings'],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default messageBindingsLint;
