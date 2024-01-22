import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2 } from '../../../openapi/target-specs';

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
  targetSpecs: [...AsyncAPI2, ...OpenAPI2],
};

export default discriminatorTypeOpenAPI2_0__AsyncAPI2Lint;
