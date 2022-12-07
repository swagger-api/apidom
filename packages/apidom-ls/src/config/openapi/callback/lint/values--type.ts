import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_CALLBACK_VALUES_TYPE,
  source: 'apilint',
  message: 'Callback Object values must be of Path Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
