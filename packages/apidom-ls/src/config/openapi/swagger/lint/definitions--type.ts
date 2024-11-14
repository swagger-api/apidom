import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const definitionsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_DEFINITIONS_TYPE,
  source: 'apilint',
  message: '"definitions" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['definitions']],
  marker: 'value',
  target: 'definitions',
  data: {},
  targetSpecs: OpenAPI2,
};

export default definitionsTypeLint;
