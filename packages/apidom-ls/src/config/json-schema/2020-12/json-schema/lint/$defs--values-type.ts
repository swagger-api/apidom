import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $defsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$DEFS_VALUES_TYPE,
  source: 'apilint',
  message: "'$defs' values must be of JSON Schema shape",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['JSONSchema202012', 'boolean']],
  marker: 'key',
  markerTarget: '$defs',
  target: '$defs',
  conditions: [
    {
      targets: [{ path: '$defs' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $defsValuesTypeLint;
