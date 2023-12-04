import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const headersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_ENCODING_FIELD_HEADERS_VALUES_TYPE,
  source: 'apilint',
  message: '"headers" members must be Header Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['header']],
  marker: 'key',
  markerTarget: 'headers',
  target: 'headers',
  data: {},
  targetSpecs: OpenAPI3,
};

export default headersValuesTypeLint;
