import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const discriminatorTypeOpenAPI2_0__AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DISCRIMINATOR,
  source: 'apilint',
  message: "'discriminator' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'discriminator',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2],
};

export default discriminatorTypeOpenAPI2_0__AsyncAPI2Lint;
