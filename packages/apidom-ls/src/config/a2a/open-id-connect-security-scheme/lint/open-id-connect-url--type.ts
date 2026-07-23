import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const openIdConnectUrlTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_OPEN_ID_CONNECT_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_TYPE,
  source: 'apilint',
  message: "'openIdConnectUrl' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'openIdConnectUrl',
  targetSpecs: A2A1,
};

export default openIdConnectUrlTypeLint;
