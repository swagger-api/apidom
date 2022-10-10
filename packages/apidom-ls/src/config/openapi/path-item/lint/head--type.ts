import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const headTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_HEAD_TYPE,
  source: 'apilint',
  message: '"head" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'head',
  data: {},
};

export default headTypeLint;
