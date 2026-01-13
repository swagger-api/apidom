import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const propertiesValuesTypeOpenAPI3_1__AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES,
  source: 'apilint',
  message: 'properties members must be schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema', 'boolean']],
  marker: 'key',
  markerTarget: 'properties',
  target: 'properties',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2, ...AsyncAPI3],
};

export default propertiesValuesTypeOpenAPI3_1__AsyncAPI2Lint;
