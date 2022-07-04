import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const titleTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TITLE,
  source: 'apilint',
  message: "title' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default titleTypeLint;
