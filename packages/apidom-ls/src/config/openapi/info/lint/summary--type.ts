import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_INFO_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: 'summary must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default summaryTypeLint;
