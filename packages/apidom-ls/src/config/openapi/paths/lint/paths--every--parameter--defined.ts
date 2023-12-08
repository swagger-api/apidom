import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const everyParameterDefinedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATHS_EVERY_PARAMETER_IS_DEFINED,
  source: 'apilint',
  message:
    'Each template expression in given path must have a corresponding parameter defined in the parameters section of the same path.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPathsEveryParameterDefined',
  linterParams: [['paths']],
  marker: 'key',
  data: {},
};

export default everyParameterDefinedLint;
