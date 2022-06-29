import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const anypointmqChannelBindingBindingVersionLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_ANYPOINTMQ_BINDINGVERSION,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default anypointmqChannelBindingBindingVersionLint;
