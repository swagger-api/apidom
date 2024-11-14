import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const parametersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_PARAMETERS_VALUES_TYPE,
  source: 'apilint',
  message: '"parameters" members must be Parameter Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
  targetSpecs: OpenAPI3,
};

export default parametersValuesTypeLint;
