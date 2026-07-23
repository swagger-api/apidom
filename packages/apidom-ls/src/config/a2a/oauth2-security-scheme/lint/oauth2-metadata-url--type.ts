import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const oauth2MetadataUrlTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH2_SECURITY_SCHEME_FIELD_OAUTH2_METADATA_URL_TYPE,
  source: 'apilint',
  message: "'oauth2MetadataUrl' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'oauth2MetadataUrl',
  targetSpecs: A2A1,
};

export default oauth2MetadataUrlTypeLint;
