import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSES_DEFINITIONS_VALUES_TYPE,
  source: 'apilint',
  message: 'Responses Definitions Object values must be of Response Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['response']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default valuesTypeLint;
