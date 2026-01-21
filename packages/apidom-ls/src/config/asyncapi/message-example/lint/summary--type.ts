import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_EXAMPLE_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: "'summary' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default summaryTypeLint;
