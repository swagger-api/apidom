import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const uriTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_EXTENSION_FIELD_URI_TYPE,
  source: 'apilint',
  message: "'uri' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'uri',
  targetSpecs: A2A1,
};

export default uriTypeLint;
