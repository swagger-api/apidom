import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const schemasValuesTypeOpenAPI3_1_AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_SCHEMAS_VALUES_TYPE,
  source: 'apilint',
  message: '"schemas" members must be Schema Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema', 'boolean']],
  marker: 'key',
  markerTarget: 'schemas',
  target: 'schemas',
  data: {},
  targetSpecs: [...OpenAPI31],
};

export default schemasValuesTypeOpenAPI3_1_AsyncAPI2Lint;
