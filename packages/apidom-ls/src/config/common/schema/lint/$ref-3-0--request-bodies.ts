import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../../openapi/target-specs.ts';

const $ref3RequestBodiesLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_REQUEST_BODIES,
  source: 'apilint',
  message:
    'requestBody schema $refs must point to a position where a Schema Object can be legally placed',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'parentExistFields',
  linterParams: [['requestBody']],
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'apilintValueRegex',
      params: ['^(?!.*#/components/schemas).*$'],
    },
  ],
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: OpenAPI30,
};

export default $ref3RequestBodiesLint;
