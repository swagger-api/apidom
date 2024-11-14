import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const $refFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_ITEM_FIELD_$REF_FORMAT_URI,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default $refFormatURILint;
