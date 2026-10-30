import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $refFormatURILint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$REF_FORMAT_URI,
  source: 'apilint',
  message: "'$ref' must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'apilintType',
      params: ['string'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $refFormatURILint;
