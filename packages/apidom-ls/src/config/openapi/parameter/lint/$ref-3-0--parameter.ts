import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

const $ref3ParameterNamingLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_PARAMETER,
  source: 'apilint',
  message: 'OAS3 parameter $Ref should point to Parameter Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^(.*#/components/parameters).*$'],
  marker: 'value',
  target: '$ref',
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'parentExistFields',
      params: [['paths']],
    },
    {
      targets: [{ path: '$ref' }],
      function: 'apilintValueRegex',
      params: ['^(#/).*$'],
    },
  ],
  data: {},
  targetSpecs: OpenAPI30,
};

export default $ref3ParameterNamingLint;
