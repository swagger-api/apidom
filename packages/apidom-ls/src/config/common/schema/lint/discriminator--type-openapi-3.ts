import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../../openapi/target-specs.ts';

const discriminatorTypeOpenAPI3Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DISCRIMINATOR,
  source: 'apilint',
  message: "'discriminator' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['discriminator'],
  marker: 'value',
  target: 'discriminator',
  data: {},
  targetSpecs: OpenAPI3,
};

export default discriminatorTypeOpenAPI3Lint;
