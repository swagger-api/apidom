import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const schemaFormatTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MULTI_FORMAT_SCHEMA_FIELD_SCHEMA_FORMAT_TYPE,
  source: 'apilint',
  message: "'schemaFormat' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaFormat',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default schemaFormatTypeLint;
