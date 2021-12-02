import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverDescriptionLint: LinterMeta = {
  code: ApilintCodes.SERVER_DESCRIPTION,
  source: 'apilint',
  message: "'description' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default serverDescriptionLint;
