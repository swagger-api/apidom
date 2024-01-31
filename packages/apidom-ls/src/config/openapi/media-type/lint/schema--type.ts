import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_MEDIA_TYPE_FIELD_SCHEMA_VALUES_TYPE,
  source: 'apilint',
  message: 'schema must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema']],
  marker: 'value',
  target: 'schema',
  data: {},
  targetSpecs: OpenAPI30,
};

export default schemaTypeLint;
