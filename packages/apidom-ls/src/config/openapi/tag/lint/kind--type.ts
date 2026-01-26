import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const kindTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_TAG_FIELD_KIND_TYPE,
  source: 'apilint',
  message: "'kind' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'kind',
  data: {},
  targetSpecs: OpenAPI32,
};

export default kindTypeLint;
