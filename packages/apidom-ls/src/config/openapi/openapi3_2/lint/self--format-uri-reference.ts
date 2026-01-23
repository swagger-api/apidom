import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const $selfFormatURIReferenceLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_SELF_FORMAT_URI_REFERENCE,
  source: 'apilint',
  message: '$self value must be a valid URI reference',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURIReferenceOrFragment',
  linterParams: [],
  marker: 'value',
  target: '$self',
  data: {},
  targetSpecs: OpenAPI32,
};

export default $selfFormatURIReferenceLint;
