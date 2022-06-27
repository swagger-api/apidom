import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationIDDescriptionLint: LinterMeta = {
  code: ApilintCodes.CORRELATIONID_DESCRIPTION,
  source: 'apilint',
  message: "'description' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default correlationIDDescriptionLint;
