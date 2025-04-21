import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../../target-specs.ts';

const $schemaFormatURILint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$SCHEMA_FORMAT_URI,
  source: 'apilint',
  message: 'The value of $schema keyword MUST be a URI [RFC3986] containing a scheme',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: '$schema',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $schemaFormatURILint;
