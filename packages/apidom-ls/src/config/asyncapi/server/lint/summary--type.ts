import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_SERVER_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: "'summary' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default summaryTypeLint;
