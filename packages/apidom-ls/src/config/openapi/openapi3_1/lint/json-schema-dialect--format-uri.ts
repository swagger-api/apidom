import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../target-specs.ts';

const jsonSchemaDialectFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_JSON_SCHEMA_DIALECT_FORMAT_URI,
  source: 'apilint',
  message: "'jsonSchemaDialect' value MUST be in the form of a URI.",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'jsonSchemaDialect',
  data: {},
  targetSpecs: OpenAPI31,
};

export default jsonSchemaDialectFormatURILint;
