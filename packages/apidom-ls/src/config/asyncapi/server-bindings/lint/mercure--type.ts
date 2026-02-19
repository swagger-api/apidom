import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const mercureTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_MERCURE_TYPE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['mercureServerBinding']],
  marker: 'value',
  target: 'mercure',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default mercureTypeLint;
