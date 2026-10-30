import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const relItemsTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_REL_ITEMS_TYPE,
  source: 'apilint',
  message: "'rel' must be a non-empty array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string', true],
  marker: 'key',
  markerTarget: 'rel',
  target: 'rel',
  conditions: [
    {
      targets: [{ path: 'rel' }],
      function: 'apilintType',
      params: ['array'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default relItemsTypeLint;
