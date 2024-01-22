import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

const patternPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES_OBJECT,
  source: 'apilint',
  message: 'patternProperties must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'patternProperties',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default patternPropertiesTypeLint;
