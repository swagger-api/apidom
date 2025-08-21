import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const $ref3RequestBodiesNamingSchemaLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_REQUEST_BODIES_NAMING_SCHEMA,
  source: 'apilint',
  message:
    "requestBody $refs cannot point to '#/components/schemas/…', they must point to '#/components/requestBodies/…'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'parentExistFields',
  linterParams: [['requestBodies']],
  conditions: [
    {
      targets: [{ path: '$ref' }],
      function: 'apilintValueRegex',
      params: ['^(.*#/components/schemas).*$'],
    },
  ],
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: OpenAPI3,
};

export default $ref3RequestBodiesNamingSchemaLint;
