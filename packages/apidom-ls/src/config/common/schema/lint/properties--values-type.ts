import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const propertiesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES,
  source: 'apilint',
  message: 'properties members must be schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema']],
  marker: 'key',
  markerTarget: 'properties',
  target: 'properties',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default propertiesValuesTypeLint;
