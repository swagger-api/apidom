import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const titleTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_TITLE_TYPE,
  source: 'apilint',
  message: 'title must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default titleTypeLint;
