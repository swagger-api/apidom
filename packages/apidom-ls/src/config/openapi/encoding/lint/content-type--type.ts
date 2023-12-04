import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const contentTypeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_ENCODING_FIELD_CONTENT_TYPE_TYPE,
  source: 'apilint',
  message: 'contentType must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'contentType',
  data: {},
  targetSpecs: OpenAPI30,
};

export default contentTypeTypeLint;
