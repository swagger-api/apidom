import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const serverBindingsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_SERVER_BINDINGS_VALUES_TYPE,
  source: 'apilint',
  message: '"serverBindings" members must be Server Bindings Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverBindings']],
  marker: 'key',
  markerTarget: 'serverBindings',
  target: 'serverBindings',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default serverBindingsValuesTypeLint;
