import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../../openapi/target-specs';

const xmlTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_XML,
  source: 'apilint',
  message: 'xml must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['xml'],
  marker: 'value',
  target: 'xml',
  data: {},
  targetSpecs: OpenAPI3,
};

export default xmlTypeLint;
