import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_SOLACE_TYPE,
  source: 'apilint',
  message: '"solace" must be a Solace Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceServerBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceTypeLint;
