import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const bindingVersionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_GOOGLEPUBSUB_MESSAGE_BINDING_FIELD_BINDING_VERSION,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default bindingVersionTypeLint;
