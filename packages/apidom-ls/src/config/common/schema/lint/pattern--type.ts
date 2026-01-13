import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const patternTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERN,
  source: 'apilint',
  message: "pattern' value must be a regular expression",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueIsRegex',
  marker: 'value',
  target: 'pattern',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2, ...OpenAPI3],
};

export default patternTypeLint;
