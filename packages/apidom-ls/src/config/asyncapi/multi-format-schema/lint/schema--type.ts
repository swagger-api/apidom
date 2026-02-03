import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MULTI_FORMAT_SCHEMA_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: "'schema' must be defined",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['any'],
  marker: 'value',
  target: 'schema',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default schemaTypeLint;
