import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_EXAMPLE_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: "'headers' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['object']],
  marker: 'value',
  target: 'headers',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default headersTypeLint;
