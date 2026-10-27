import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const dependentSchemasTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_DEPENDENT_SCHEMAS_TYPE,
  source: 'apilint',
  message: "'dependentSchemas' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'dependentSchemas',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default dependentSchemasTypeLint;
