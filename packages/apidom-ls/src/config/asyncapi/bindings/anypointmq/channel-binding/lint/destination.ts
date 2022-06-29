import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const anypointmqChannelBindingDestinationLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_ANYPOINTMQ_DESTINATION,
  source: 'apilint',
  message: "'destination' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'destination',
  data: {},
};

export default anypointmqChannelBindingDestinationLint;
