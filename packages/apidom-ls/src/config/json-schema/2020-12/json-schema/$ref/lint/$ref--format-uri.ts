import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../../target-specs.ts';

const $refFormatURILint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$REF_FORMAT_URI,
  source: 'apilint',
  message: 'The value of the "$ref" keyword MUST be a string which is a URI-Reference.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $refFormatURILint;
