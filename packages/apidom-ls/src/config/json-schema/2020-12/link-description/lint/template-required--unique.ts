import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const templateRequiredUniqueLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_TEMPLATE_REQUIRED_UNIQUE,
  source: 'apilint',
  message: "'templateRequired' must be an array with unique items",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintUniqueArray',
  marker: 'key',
  markerTarget: 'templateRequired',
  target: 'templateRequired',
  conditions: [
    {
      targets: [{ path: 'templateRequired' }],
      function: 'apilintType',
      params: ['array'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default templateRequiredUniqueLint;
