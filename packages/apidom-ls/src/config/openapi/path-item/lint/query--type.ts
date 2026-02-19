import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const queryTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_PATH_ITEM_FIELD_QUERY_TYPE,
  source: 'apilint',
  message: "'query' must be an Operation Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation']],
  marker: 'value',
  target: 'query',
  data: {},
  targetSpecs: OpenAPI32,
};

export default queryTypeLint;
