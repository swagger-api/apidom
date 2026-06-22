import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const locationValueLint: LinterMeta = {
  code: ApilintCodes.A2A1_API_KEY_SECURITY_SCHEME_FIELD_LOCATION_VALUE,
  source: 'apilint',
  message: "'location' must be one of allowed values: query, header, cookie",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'cookie']],
  marker: 'value',
  target: 'location',
  data: {},
  targetSpecs: A2A1,
};

export default locationValueLint;
