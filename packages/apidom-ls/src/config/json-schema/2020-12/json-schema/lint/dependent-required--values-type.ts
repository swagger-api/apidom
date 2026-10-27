import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const dependentRequiredValuesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_DEPENDENT_REQUIRED_VALUES_TYPE,
  source: 'apilint',
  message: "'dependentRequired' values must be arrays of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfType',
  linterParams: ['array'],
  marker: 'key',
  markerTarget: 'dependentRequired',
  target: 'dependentRequired',
  conditions: [
    {
      targets: [{ path: 'dependentRequired' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default dependentRequiredValuesTypeLint;
