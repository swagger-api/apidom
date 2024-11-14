import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: "'schema' must be a schema object or a boolean JSON schema",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'schema',
  data: {},
};

export default schemaTypeLint;
