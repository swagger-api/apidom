import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitTitleLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_TITLE,
  source: 'apilint',
  message: "'title' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default messageTraitTitleLint;
