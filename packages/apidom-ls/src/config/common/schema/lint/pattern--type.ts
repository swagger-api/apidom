import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const patternTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERN,
  source: 'apilint',
  message: "pattern' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'pattern',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default patternTypeLint;
