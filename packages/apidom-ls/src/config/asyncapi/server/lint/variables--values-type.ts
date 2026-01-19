import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const variablesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_VARIABLES_VALUES_TYPE,
  source: 'apilint',
  message: "variables' values must be of Server Variable Object shape",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverVariable']],
  marker: 'key',
  markerTarget: 'variables',
  target: 'variables',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default variablesValuesTypeLint;
