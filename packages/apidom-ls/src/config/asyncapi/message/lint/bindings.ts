import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageBindingsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDINGS,
  source: 'apilint',
  message: 'bindings members must be Message Binding objects',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['message-binding']],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default messageBindingsLint;
