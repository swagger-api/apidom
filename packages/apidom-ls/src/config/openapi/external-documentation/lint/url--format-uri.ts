import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const urlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_EXTERNAL_DOCUMENTATION_FIELD_URL_FORMAT_URI,
  source: 'apilint',
  message: "'url' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default urlFormatURILint;
