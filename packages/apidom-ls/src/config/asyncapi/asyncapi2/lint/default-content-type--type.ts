import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const defaultContentTypeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_DEFAULT_CONTENT_TYPE_TYPE,
  source: 'apilint',
  message: "'defaultContentType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'defaultContentType',
  data: {},
};

export default defaultContentTypeTypeLint;
