import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wrappedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_XML_FIELD_WRAPPED_TYPE,
  source: 'apilint',
  message: 'wrapped must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'wrapped',
  data: {},
};

export default wrappedTypeLint;
