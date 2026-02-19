import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const $selfTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_SELF_TYPE,
  source: 'apilint',
  message: "'$self' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: '$self',
  data: {},
  targetSpecs: OpenAPI32,
};

export default $selfTypeLint;
