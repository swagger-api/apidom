import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const patchTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATH_ITEM_FIELD_PATCH_TYPE,
  source: 'apilint',
  message: '"patch" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'patch',
  data: {},
};

export default patchTypeLint;
