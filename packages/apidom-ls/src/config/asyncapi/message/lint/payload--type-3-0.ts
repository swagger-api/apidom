import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const payloadType3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MESSAGE_FIELD_PAYLOAD_TYPE,
  source: 'apilint',
  message: "'payload' must be a Multi Format Schema Object or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['multiFormatSchema', 'schema', 'reference']],
  marker: 'value',
  target: 'payload',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default payloadType3_0Lint;
