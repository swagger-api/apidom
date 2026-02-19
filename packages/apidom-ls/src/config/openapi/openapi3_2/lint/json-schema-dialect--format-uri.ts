import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const jsonSchemaDialectFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_JSON_SCHEMA_DIALECT_FORMAT_URI,
  source: 'apilint',
  message: 'jsonSchemaDialect value must be a valid URI',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [],
  marker: 'value',
  target: 'jsonSchemaDialect',
  data: {},
  targetSpecs: OpenAPI32,
};

export default jsonSchemaDialectFormatURILint;
