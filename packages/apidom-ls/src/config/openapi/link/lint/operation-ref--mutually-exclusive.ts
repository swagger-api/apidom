import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const operationRefMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_LINK_FIELD_OPERATION_REF_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `operationRef` field and `operationId` field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['operationId']],
  marker: 'key',
  markerTarget: 'operationRef',
  conditions: [
    {
      function: 'existFields',
      params: [['operationRef']],
    },
  ],
  targetSpecs: OpenAPI3,
};

export default operationRefMutuallyExclusiveLint;
