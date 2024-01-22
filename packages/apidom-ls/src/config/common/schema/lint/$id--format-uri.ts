import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI3 } from '../../../openapi/target-specs';

const $idFormatURILint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ID,
  source: 'apilint',
  message: "'$id' value must be a valid URI-reference string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$id',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI3],
};

export default $idFormatURILint;
