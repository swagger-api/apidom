import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const openIdConnectUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_TYPE,
  source: 'apilint',
  message: "'openIdConnectUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'openIdConnectUrl',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default openIdConnectUrlFormatURILint;
