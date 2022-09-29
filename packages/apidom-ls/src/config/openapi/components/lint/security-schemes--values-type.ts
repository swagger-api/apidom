import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_SECURITY_SCHEMES_VALUES_TYPE,
  source: 'apilint',
  message: '"securitySchemes" members must be Security Scheme Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['securityScheme']],
  marker: 'key',
  markerTarget: 'securitySchemes',
  target: 'securitySchemes',
  data: {},
};

export default securitySchemesValuesTypeLint;
