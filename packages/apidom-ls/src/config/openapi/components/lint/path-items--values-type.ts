import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const pathItemsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_COMPONENTS_FIELD_PATH_ITEMS_VALUES_TYPE,
  source: 'apilint',
  message: '"pathItems" members must be Path Item Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  markerTarget: 'pathItems',
  target: 'pathItems',
  data: {},
  targetSpecs: OpenAPI3,
};

export default pathItemsValuesTypeLint;
