import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const externalValueFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_EXAMPLE_FIELD_EXTERNAL_VALUE_FORMAT_URI,
  source: 'apilint',
  message: "'externalValue' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'externalValue',
  data: {},
  targetSpecs: OpenAPI3,
};

export default externalValueFormatURILint;
