import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const scopesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_SECURITY_SCHEME_FIELD_SCOPES_TYPE,
  source: 'apilint',
  message: "'scopes' must be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  markerTarget: 'scopes',
  target: 'scopes',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default scopesTypeLint;
