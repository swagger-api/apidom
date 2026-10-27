import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const requiredUniqueLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_REQUIRED_UNIQUE,
  source: 'apilint',
  message: "'required' must be an array with unique items",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintUniqueArray',
  marker: 'key',
  markerTarget: 'required',
  target: 'required',
  conditions: [
    {
      targets: [{ path: 'required' }],
      function: 'apilintType',
      params: ['array'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default requiredUniqueLint;
