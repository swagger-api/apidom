import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const defaultContentTypeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_DEFAULT_CONTENT_TYPE_TYPE,
  source: 'apilint',
  message: "'defaultContentType' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'defaultContentType',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default defaultContentTypeTypeLint;
