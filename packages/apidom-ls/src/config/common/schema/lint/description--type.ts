import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DESCRIPTION,
  source: 'apilint',
  message: "description' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default descriptionTypeLint;
