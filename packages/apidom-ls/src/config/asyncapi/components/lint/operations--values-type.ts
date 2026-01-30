import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const operationsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_OPERATIONS_VALUES_TYPE,
  source: 'apilint',
  message: 'operations values must be operations objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operations'], ['operation', 'reference']],
  marker: 'key',
  markerTarget: 'operations',
  target: 'operations',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default operationsValuesTypeLint;
