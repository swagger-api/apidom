import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const titleTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TITLE_TYPE,
  source: 'apilint',
  message: 'title must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default titleTypeLint;
