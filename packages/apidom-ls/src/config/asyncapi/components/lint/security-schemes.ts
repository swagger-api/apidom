import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsSecuritySchemesLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SECURITYSCHEMES,
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

export default componentsSecuritySchemesLint;
