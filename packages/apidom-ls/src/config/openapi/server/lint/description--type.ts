import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: "'description' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default descriptionTypeLint;
