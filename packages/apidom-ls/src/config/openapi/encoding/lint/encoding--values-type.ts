import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const encodingValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_ENCODING_FIELD_ENCODING_VALUES_TYPE,
  source: 'apilint',
  message: '"encoding" members must be Encoding Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['encoding']],
  marker: 'key',
  markerTarget: 'encoding',
  target: 'encoding',
  data: {},
  targetSpecs: OpenAPI32,
};

export default encodingValuesTypeLint;
