import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const collectionFormatEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_COLLECTION_FORMAT_EQUALS,
  source: 'apilint',
  message:
    "'collectionFormat' must be one of allowed values: 'csv', 'ssv', 'tsv', 'pipes', 'multi'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['csv', 'ssv', 'tsv', 'pipes', 'multi']],
  marker: 'value',
  target: 'collectionFormat',
  data: {},
  targetSpecs: OpenAPI2,
};

export default collectionFormatEqualsLint;
