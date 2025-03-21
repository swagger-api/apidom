import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../target-specs.ts';

const identifierTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_LICENSE_FIELD_IDENTIFIER_TYPE,
  source: 'apilint',
  message: "'identifier' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
  targetSpecs: OpenAPI31,
};

export default identifierTypeLint;
