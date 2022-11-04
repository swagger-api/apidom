import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a IBM MQ Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['googlepubsubServerBinding'],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
};

export default googlepubsubTypeLint;
