import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI3 } from '../../../openapi/target-specs.ts';

const $idFormatURILint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ID,
  source: 'apilint',
  message: "'$id' value must be a valid URI-reference string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$id',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI3],
};

export default $idFormatURILint;
