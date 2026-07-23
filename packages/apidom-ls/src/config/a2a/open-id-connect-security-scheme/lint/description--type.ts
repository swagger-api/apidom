import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_OPEN_ID_CONNECT_SECURITY_SCHEME_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: "'description' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  targetSpecs: A2A1,
};

export default descriptionTypeLint;
