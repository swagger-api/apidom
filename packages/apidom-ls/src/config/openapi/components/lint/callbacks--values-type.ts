import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const callbacksValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_CALLBACKS_VALUES_TYPE,
  source: 'apilint',
  message: '"callbacks" members must be Callback Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['callback']],
  marker: 'key',
  markerTarget: 'callbacks',
  target: 'callbacks',
  data: {},
  targetSpecs: OpenAPI3,
};

export default callbacksValuesTypeLint;
