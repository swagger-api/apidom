import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const additionalOperationsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_PATH_ITEM_FIELD_ADDITIONAL_OPERATIONS_VALUES_TYPE,
  source: 'apilint',
  message: "'additionalOperations' values must be Operation Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operation']],
  marker: 'key',
  markerTarget: 'additionalOperations',
  target: 'additionalOperations',
  data: {},
  targetSpecs: OpenAPI32,
};

export default additionalOperationsValuesTypeLint;
