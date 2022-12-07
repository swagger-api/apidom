import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REQUIRED,
  source: 'apilint',
  message: 'required must be an array of strings',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'required',
  data: {},
};

export default requiredTypeLint;
