import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETERS_DEFINITIONS_VALUES_TYPE,
  source: 'apilint',
  message: 'Parameter Definitions Object values must be of Parameter Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default valuesTypeLint;
