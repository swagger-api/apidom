import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const propertiesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_PROPERTIES_VALUES_TYPE,
  source: 'apilint',
  message: "'properties' values must be of JSON Schema shape",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['JSONSchema202012', 'boolean']],
  marker: 'key',
  markerTarget: 'properties',
  target: 'properties',
  conditions: [
    {
      targets: [{ path: 'properties' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default propertiesValuesTypeLint;
