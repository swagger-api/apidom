import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const serializedValueTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_EXAMPLE_FIELD_SERIALIZED_VALUE_TYPE,
  source: 'apilint',
  message: 'serializedValue must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'serializedValue',
  data: {},
  targetSpecs: OpenAPI32,
};

export default serializedValueTypeLint;
