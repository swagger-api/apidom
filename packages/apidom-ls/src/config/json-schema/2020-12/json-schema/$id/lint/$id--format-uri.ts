import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../../target-specs.ts';

const $idFormatURILint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$ID_FORMAT_URI,
  source: 'apilint',
  message: '$id value must be a valid URI-reference',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$id',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $idFormatURILint;
