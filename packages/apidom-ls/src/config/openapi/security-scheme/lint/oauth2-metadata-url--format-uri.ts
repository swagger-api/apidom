import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const oauth2MetadataUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_SECURITY_SCHEME_FIELD_OAUTH2_METADATA_URL_FORMAT_URI,
  source: 'apilint',
  message: 'oauth2MetadataUrl MUST be in the format of an absolute URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'oauth2MetadataUrl',
  data: {},
  targetSpecs: OpenAPI32,
};

export default oauth2MetadataUrlFormatURILint;
