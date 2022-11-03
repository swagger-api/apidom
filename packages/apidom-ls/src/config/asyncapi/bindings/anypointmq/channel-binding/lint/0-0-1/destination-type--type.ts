import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const destinationTypeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ANYPOINTMQ_CHANNEL_BINDING_FIELD_DESTINATION_TYPE_TYPE,
  source: 'apilint',
  message: "'destinationType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'destinationType',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.0.1']],
    },
  ],
};

export default destinationTypeTypeLint;
