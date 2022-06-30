import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const bindingsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_BINDINGS_TYPE,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['serverBindings'],
  marker: 'value',
  target: 'bindings',
  data: {},
};

export default bindingsTypeLint;
