import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const bindingsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_BINDINGS_TYPE,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operationBindings']],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default bindingsTypeLint;
