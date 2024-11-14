import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const defaultContentTypeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_DEFAULT_CONTENT_TYPE_TYPE,
  source: 'apilint',
  message: "'defaultContentType' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'defaultContentType',
  data: {},
};

export default defaultContentTypeTypeLint;
