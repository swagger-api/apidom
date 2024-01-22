import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REQUIRED,
  source: 'apilint',
  message: 'required must be an array of strings',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'required',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default requiredTypeLint;
