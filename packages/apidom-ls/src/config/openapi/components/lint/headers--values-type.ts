import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const headersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_HEADERS_VALUES_TYPE,
  source: 'apilint',
  message: '"headers" members must be Parameter Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['header']],
  marker: 'key',
  markerTarget: 'headers',
  target: 'headers',
  data: {},
};

export default headersValuesTypeLint;
