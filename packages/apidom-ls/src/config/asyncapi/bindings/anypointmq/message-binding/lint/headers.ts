import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const anypointmqMessageBindingHeadersLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_ANYPOINTMQ_HEADERS,
  source: 'apilint',
  message: 'headers must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'headers',
  data: {},
};

export default anypointmqMessageBindingHeadersLint;
