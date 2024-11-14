import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const defaultTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_VARIABLE_FIELD_DEFAULT_TYPE,
  source: 'apilint',
  message: "'default' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'default',
  data: {},
};

export default defaultTypeLint;
