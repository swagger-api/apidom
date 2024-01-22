import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../../openapi/target-specs';

const nullableTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NULLABLE,
  source: 'apilint',
  message: 'nullable value must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'nullable',
  data: {},
  targetSpecs: OpenAPI30,
};

export default nullableTypeLint;
