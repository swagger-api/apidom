import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const discriminatorTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DISCRIMINATOR,
  source: 'apilint',
  message: "discriminator' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'discriminator',
  data: {},
};

export default discriminatorTypeLint;
