import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../../openapi/target-specs.ts';

const containsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_CONTAINS,
  source: 'apilint',
  message: 'contains must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema']],
  marker: 'value',
  target: 'contains',
  data: {},
  targetSpecs: OpenAPI30,
};

export default containsTypeLint;
