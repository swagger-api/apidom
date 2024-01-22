import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DESCRIPTION,
  source: 'apilint',
  message: "description' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default descriptionTypeLint;
