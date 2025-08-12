import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const $ref3RequestBodiesNamingLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_REQUEST_BODIES_NAMING,
  source: 'apilint',
  message: 'requestBody $refs must point to a position where a requestBody can be legally placed',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'parentExistFields',
  linterParams: [['requestBodies']],
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'apilintValueRegex',
      params: ['^(?!.*#/components/(requestBodies|schemas)).*$'],
    },
  ],
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: OpenAPI3,
};

export default $ref3RequestBodiesNamingLint;
