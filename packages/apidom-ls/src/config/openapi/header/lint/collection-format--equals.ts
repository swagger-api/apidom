import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const collectionFormatEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_COLLECTION_FORMAT_EQUALS,
  source: 'apilint',
  message: "'collectionFormat' must be one of allowed values: 'csv', 'ssv', 'tsv', 'pipes'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['csv', 'ssv', 'tsv', 'pipes']],
  marker: 'value',
  target: 'collectionFormat',
  data: {},
  targetSpecs: OpenAPI2,
};

export default collectionFormatEqualsLint;
