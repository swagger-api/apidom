import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const encodingValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_MEDIA_TYPE_FIELD_ENCODING_VALUES_TYPE,
  source: 'apilint',
  message: '"encoding" members must be Example Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['encoding']],
  marker: 'key',
  markerTarget: 'encoding',
  target: 'encoding',
  data: {},
  targetSpecs: OpenAPI3,
};

export default encodingValuesTypeLint;
