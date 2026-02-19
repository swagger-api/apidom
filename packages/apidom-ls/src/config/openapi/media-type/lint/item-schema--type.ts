import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const itemSchemaTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_MEDIA_TYPE_FIELD_ITEM_SCHEMA_TYPE,
  source: 'apilint',
  message: 'itemSchema must be a schema object or reference',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'reference']],
  marker: 'value',
  target: 'itemSchema',
  data: {},
  targetSpecs: OpenAPI32,
};

export default itemSchemaTypeLint;
