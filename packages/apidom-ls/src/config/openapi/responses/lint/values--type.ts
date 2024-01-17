import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSES_VALUES_TYPE,
  source: 'apilint',
  message: 'Responses Object values must be of Response Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['response']],
  marker: 'key',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default valuesTypeLint;
