import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATHS_VALUES_TYPE,
  source: 'apilint',
  message: 'Paths Object values must be of Path Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default valuesTypeLint;
