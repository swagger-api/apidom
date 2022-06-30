import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_MERCURE_TYPE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureServerBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureTypeLint;
