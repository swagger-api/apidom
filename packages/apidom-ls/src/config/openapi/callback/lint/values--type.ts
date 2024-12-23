import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_CALLBACK_VALUES_TYPE,
  source: 'apilint',
  message: 'Callback Object values must be of Path Item Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI3,
};

export default valuesTypeLint;
