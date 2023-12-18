import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../target-specs';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: 'schema must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'schema',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default schemaTypeLint;
