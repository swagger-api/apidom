import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const authorizationUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_FORMAT_URI,
  source: 'apilint',
  message: "'authorizationUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'authorizationUrl',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default authorizationUrlFormatURILint;
