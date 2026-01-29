import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const messageBindingsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_MESSAGE_BINDINGS_VALUES_TYPE,
  source: 'apilint',
  message: '"messageBindings" members must be Message Bindings Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['messageBindings']],
  marker: 'key',
  markerTarget: 'messageBindings',
  target: 'messageBindings',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default messageBindingsValuesTypeLint;
