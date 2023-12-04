import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const titleTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TITLE_TYPE,
  source: 'apilint',
  message: 'title must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
  targetSpecs: OpenAPI3,
};

export default titleTypeLint;
