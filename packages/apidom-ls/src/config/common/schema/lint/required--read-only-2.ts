import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../../openapi/target-specs.ts';

const readOnlyRequiredLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY_REQUIRED,
  source: 'apilint',
  message: 'Read only properties cannot be marked as required by a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintRequiredReadOnlyInProperties',
  marker: 'value',
  target: 'required',
  markerTarget: 'required',
  data: {},
  targetSpecs: OpenAPI2,
};

export default readOnlyRequiredLint;
