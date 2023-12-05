import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const defaultTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_DEFAULT_TYPE,
  source: 'apilint',
  message: "'default' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'default',
  data: {},
  targetSpecs: OpenAPI3,
};

export default defaultTypeLint;
