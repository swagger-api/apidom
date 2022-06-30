import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_WS_TYPE,
  source: 'apilint',
  message: '"ws" must be a WebSockets Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsServerBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsTypeLint;
