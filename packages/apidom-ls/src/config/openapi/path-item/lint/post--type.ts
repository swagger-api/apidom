import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const postTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATH_ITEM_FIELD_POST_TYPE,
  source: 'apilint',
  message: '"post" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'post',
  data: {},
};

export default postTypeLint;
