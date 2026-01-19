import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const httpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_HTTP_TYPE,
  source: 'apilint',
  message: '"http" must be a HTTP Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['httpMessageBinding']],
  marker: 'value',
  target: 'http',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default httpTypeLint;
