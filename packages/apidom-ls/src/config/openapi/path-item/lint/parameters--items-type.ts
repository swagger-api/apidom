import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parametersItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_PARAMETERS_ITEMS_TYPE,
  source: 'apilint',
  message: 'parameters must be an array of Parameter Objects',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  target: 'parameters',
  data: {},
};

export default parametersItemsTypeLint;
