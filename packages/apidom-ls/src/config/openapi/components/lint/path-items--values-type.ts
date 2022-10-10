import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const pathItemsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_COMPONENTS_FIELD_PATH_ITEMS_VALUES_TYPE,
  source: 'apilint',
  message: '"pathItems" members must be Path Item Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  markerTarget: 'pathItems',
  target: 'pathItems',
  data: {},
};

export default pathItemsValuesTypeLint;
