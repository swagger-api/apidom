import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const inOverlapsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_OVERLAPS,
  source: 'apilint',
  message:
    'Parameters cannot have both a "in: body" and "in: formData", as "formData" _will_ be the body',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintParametersInOverlaps',
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
  targetSpecs: OpenAPI2,
};

export default inOverlapsLint;
