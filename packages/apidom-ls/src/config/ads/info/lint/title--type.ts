import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const titleTypeLint: LinterMeta = {
  code: ApilintCodes.ADS_INFO_FIELD_TITLE_TYPE,
  source: 'apilint',
  message: 'title must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default titleTypeLint;
