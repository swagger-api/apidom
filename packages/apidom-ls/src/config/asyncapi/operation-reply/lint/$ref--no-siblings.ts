import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const $refNoSiblingsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_FIELD_$REF_NO_SIBLINGS,
  source: 'apilint',
  message: 'All other properties in a Operation Reply Object are ignored if $ref is present',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'allowedFieldsRefOrContent',
  linterParams: [['$ref']],
  marker: 'key',
  markerTarget: '$ref',
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {},
  targetSpecs: AsyncAPI3,
};

export default $refNoSiblingsLint;
