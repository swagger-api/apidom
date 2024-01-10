import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Headers Object values must be of Header Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['header']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default valuesTypeLint;
