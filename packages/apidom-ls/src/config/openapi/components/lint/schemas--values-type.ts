import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const schemasValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_SCHEMAS_VALUES_TYPE,
  source: 'apilint',
  message: '"schemas" members must be Schema Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema']],
  marker: 'key',
  markerTarget: 'schemas',
  target: 'schemas',
  data: {},
  targetSpecs: OpenAPI30,
};

export default schemasValuesTypeLint;
