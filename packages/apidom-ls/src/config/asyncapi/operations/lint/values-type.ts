import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATIONS_VALUES_TYPE,
  source: 'apilint',
  message: 'Operations Object values must be of Operation Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operation']],
  marker: 'key',
  markerTarget: 'operations',
  target: 'operations',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default valuesTypeLint;
