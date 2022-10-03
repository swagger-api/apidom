import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const getTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATH_ITEM_FIELD_GET_TYPE,
  source: 'apilint',
  message: '"get" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'get',
  data: {},
};

export default getTypeLint;
