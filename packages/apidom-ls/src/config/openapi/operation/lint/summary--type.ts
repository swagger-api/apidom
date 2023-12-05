import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: 'summary must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
  targetSpecs: OpenAPI3,
};

export default summaryTypeLint;
