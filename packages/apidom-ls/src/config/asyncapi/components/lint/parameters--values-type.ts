import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const parametersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_PARAMETERS_VALUES_TYPE,
  source: 'apilint',
  message: '"parameters" members must be Parameter object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default parametersValuesTypeLint;
