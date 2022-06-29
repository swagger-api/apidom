import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const anypointmqChannelBindingDestinationTypeLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_ANYPOINTMQ_DESTINATION_TYPE,
  source: 'apilint',
  message: "'destinationType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'destinationType',
  data: {},
};

export default anypointmqChannelBindingDestinationTypeLint;
