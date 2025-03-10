import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const securitySchemesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_SECURITY_SCHEMES_VALUES_TYPE,
  source: 'apilint',
  message: '"securitySchemes" members must be Security Scheme Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['securityScheme']],
  marker: 'key',
  markerTarget: 'securitySchemes',
  target: 'securitySchemes',
  data: {},
  targetSpecs: OpenAPI3,
};

export default securitySchemesValuesTypeLint;
