import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const headersType3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MESSAGE_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: "'headers' must be a Multi Format Schema Object or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['multiFormatSchema', 'schema']],
  marker: 'value',
  target: 'headers',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default headersType3_0Lint;
