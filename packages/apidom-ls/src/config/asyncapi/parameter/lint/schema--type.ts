import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: "'schema' must be a schema",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema', 'boolean'],
  marker: 'value',
  target: 'schema',
  data: {},
};

export default schemaTypeLint;
