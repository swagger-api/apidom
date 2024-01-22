import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';

const enumUniqueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ENUM,
  source: 'apilint',
  message: "enum' value must be an array with unique values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintUniqueArray',
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default enumUniqueLint;
