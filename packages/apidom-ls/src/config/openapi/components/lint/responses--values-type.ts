import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const responsesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_RESPONSES_VALUES_TYPE,
  source: 'apilint',
  message: '"responses" members must be Response Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['response']],
  marker: 'key',
  markerTarget: 'responses',
  target: 'responses',
  data: {},
  targetSpecs: OpenAPI3,
};

export default responsesValuesTypeLint;
