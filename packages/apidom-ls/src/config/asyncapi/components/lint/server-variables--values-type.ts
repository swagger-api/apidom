import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const serverVariablesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_SERVER_VARIABLES_VALUES_TYPE,
  source: 'apilint',
  message: '"servers" members must be Server Variable object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverVariable']],
  marker: 'key',
  markerTarget: 'serverVariables',
  target: 'serverVariables',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default serverVariablesValuesTypeLint;
