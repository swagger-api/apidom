import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

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
