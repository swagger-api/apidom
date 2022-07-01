import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const dscriptionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: "'description' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default dscriptionTypeLint;
