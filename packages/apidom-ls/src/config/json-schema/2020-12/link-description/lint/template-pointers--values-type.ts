import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const templatePointersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_TEMPLATE_POINTERS_VALUES_TYPE,
  source: 'apilint',
  message: "'templatePointers' values must be strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfType',
  linterParams: ['string'],
  marker: 'key',
  markerTarget: 'templatePointers',
  target: 'templatePointers',
  conditions: [
    {
      targets: [{ path: 'templatePointers' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default templatePointersValuesTypeLint;
