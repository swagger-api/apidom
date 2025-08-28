import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

const $ref3HeaderNamingLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_HEADER,
  source: 'apilint',
  message: 'OAS3 header $Ref should point to Header Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'parentExistFields',
  linterParams: [['header']],
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'apilintValueRegex',
      params: ['^(?!.*#/components/headers).*$'],
    },
  ],
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: OpenAPI30,
};

export default $ref3HeaderNamingLint;
