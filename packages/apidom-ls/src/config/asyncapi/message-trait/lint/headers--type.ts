import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: "'headers' must be a schema object or a boolean JSON schema",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'headers',
  data: {},
};

export default headersTypeLint;
