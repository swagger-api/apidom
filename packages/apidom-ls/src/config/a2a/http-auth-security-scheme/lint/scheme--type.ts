import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const schemeTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_HTTP_AUTH_SECURITY_SCHEME_FIELD_SCHEME_TYPE,
  source: 'apilint',
  message: "'scheme' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'scheme',
  targetSpecs: A2A1,
};

export default schemeTypeLint;
