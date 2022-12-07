import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const prefixTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_XML_FIELD_PREFIX_TYPE,
  source: 'apilint',
  message: 'prefix must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'prefix',
  data: {},
};

export default prefixTypeLint;
