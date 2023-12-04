import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const requestBodiesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_REQUEST_BODIES_VALUES_TYPE,
  source: 'apilint',
  message: '"requestBodies" members must be Request Body Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['requestBody']],
  marker: 'key',
  markerTarget: 'requestBodies',
  target: 'requestBodies',
  data: {},
  targetSpecs: OpenAPI3,
};

export default requestBodiesValuesTypeLint;
