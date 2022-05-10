import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageSchemaFormatLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_SCHEMAFORMAT,
  source: 'apilint',
  message: "'schemaFormat' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaFormat',
  data: {},
};

export default messageSchemaFormatLint;
