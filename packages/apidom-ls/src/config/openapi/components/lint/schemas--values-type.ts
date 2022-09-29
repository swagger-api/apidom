import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemasValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_SCHEMAS_VALUES_TYPE,
  source: 'apilint',
  message: '"schemas" members must be Schema Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema']],
  marker: 'key',
  markerTarget: 'schemas',
  target: 'schemas',
  data: {},
};

export default schemasValuesTypeLint;
