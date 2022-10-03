import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const deleteTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATH_ITEM_FIELD_DELETE_TYPE,
  source: 'apilint',
  message: '"delete" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'delete',
  data: {},
};

export default deleteTypeLint;
