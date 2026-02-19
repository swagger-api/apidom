import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a IBM MQ Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['googlepubsubServerBinding']],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default googlepubsubTypeLint;
