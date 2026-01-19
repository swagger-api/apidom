import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const $refValidLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REF,
  source: 'apilint',
  message: "'$ref' value must be an RFC3986-compliant URI reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI_RFC3986',
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2, ...OpenAPI3],
};

export default $refValidLint;
