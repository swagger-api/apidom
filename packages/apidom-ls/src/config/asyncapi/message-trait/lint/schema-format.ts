import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitSchemaFormatLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_SCHEMAFORMAT,
  source: 'apilint',
  message: "'schemaFormat' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaFormat',
  data: {},
};

export default messageTraitSchemaFormatLint;
