import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const maxPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXPROPERTIES,
  source: 'apilint',
  message: 'maxProperties must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxProperties',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default maxPropertiesTypeLint;
