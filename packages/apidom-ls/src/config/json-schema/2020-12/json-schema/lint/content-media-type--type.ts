import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const contentMediaTypeTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_CONTENT_MEDIA_TYPE_TYPE,
  source: 'apilint',
  message: "'contentMediaType' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'contentMediaType',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default contentMediaTypeTypeLint;
